using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ProyectoCore.Dto;

namespace ProyectoCore.ControllersApi
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Asegura que el endpoint solo sea accesible por usuarios autenticados
    public class TransactionController : ControllerBase
    {
        private IConfiguration _configuration;

        public TransactionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string LoadPrivateKey()
        {
            var privateKey = _configuration["PrivateKey"];

            if (string.IsNullOrEmpty(privateKey))
            {
                throw new InvalidOperationException("La clave privada no está configurada en appsettings.json.");
            }

            return privateKey;
        }

        // Método para firmar la transacción
        [HttpPost("sign")]
        public IActionResult SignTransaction([FromBody] ReciboPostDto transaction)
        {
            if (transaction == null)
                return BadRequest("Invalid transaction data");

            try
            {
                // Extraer el UserId desde el token JWT
                var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);

                if (userIdClaim == null)
                {
                    // El claim "Name" no se encontró en el token
                    return BadRequest("No se encontró el claim 'Name' en el token.");
                }

                if (!int.TryParse(userIdClaim.Value, out int userId))
                {
                    // No se pudo convertir el valor del claim "Name" a un entero
                    return BadRequest("No se pudo convertir 'userId' a un entero.");
                }

                // Convertir los datos de la transacción a un string (incluyendo el UserId)
                string transactionData = $"{userId}|{transaction.IdMetodoPago}|{transaction.IdCarrito}|{transaction.Subtotal}|{transaction.Impuestos}|{transaction.Campo}";

                // Firmar los datos de la transacción
                byte[] signedMessage = SignMessage(LoadPrivateKey(), transactionData);

                // Devolver la firma como un Base64 string
                return Ok(new { signature = Convert.ToBase64String(signedMessage) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Método para firmar un mensaje usando la clave privada con RSACryptoServiceProvider
        private byte[] SignMessage(string privateKeyBase64, string message)
        {
            using (RSA rsa = RSA.Create())
            {
                // Importar la clave privada desde Base64
                rsa.ImportRSAPrivateKey(Convert.FromBase64String(privateKeyBase64), out _);

                // Convertir el mensaje a bytes
                byte[] messageBytes = Encoding.UTF8.GetBytes(message);

                // Firmar el mensaje con SHA-256 y PKCS#1 padding
                return rsa.SignData(messageBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
            }
        }
    }
}
