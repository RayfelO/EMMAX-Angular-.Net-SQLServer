# 🤝 Guía de Contribución

> **Nota:** Este proyecto no recibe mantenimiento activo y no se planean nuevas funcionalidades a corto plazo. El código se conserva como registro histórico. Si deseas continuar el desarrollo, eres libre de hacer fork bajo los términos de la licencia MIT.

A continuación se conserva la guía original con fines informativos, en caso de que decidas continuar el proyecto de forma independiente.

> Lee la licencia [MIT](LICENSE) antes de contribuir. Al contribuir a este proyecto, aceptas que posees los derechos necesarios sobre el contenido que envías.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Tengo una Pregunta](#tengo-una-pregunta)
- [Quiero Contribuir](#quiero-contribuir)
- [Reportar Errores](#reportar-errores)
- [Sugerir Mejoras](#sugerir-mejoras)
- [Tu Primera Contribución](#tu-primera-contribución)
- [Guías de Estilo](#guías-de-estilo)
- [Mensajes de Commit](#mensajes-de-commit)
- [Reconocimientos](#reconocimientos)

---

## Código de Conducta

Este proyecto y todos los participantes están gobernados por nuestro compromiso de mantener un ambiente profesional, respetuoso e inclusivo. Se espera que todos los participantes respeten este código.

- Sé respetuoso y constructivo en todas las interacciones.
- Acepta críticas con gracia y aprende de ellas.
- Enfócate en lo que es mejor para la comunidad y el proyecto.

## Tengo una Pregunta

> [!TIP]
> Antes de abrir un issue, busca en [issues existentes](https://github.com/RayfelO/EMMAX-Angular-.Net-SQLServer/issues) para ver si tu pregunta ya fue respondida.

Si tienes una pregunta, puedes:

- Abrir un [GitHub Discussion](https://github.com/RayfelO/EMMAX-Angular-.Net-SQLServer/discussions) si está disponible.
- Abrir un issue con la etiqueta `question`.
- Contactar a cualquiera de los [colaboradores](../README.md#colaboradores).

## Quiero Contribuir

> [!IMPORTANT]
> Todas las contribuciones son bienvenidas: código, documentación, reportes de bugs, sugerencias, diseño, y más.

### Legal

Al contribuir a este proyecto, confirmas que:

1. Eres el autor 100% del contenido que envías.
2. Tienes los derechos necesarios sobre el contenido.
3. El contenido puede ser proporcionado bajo la licencia del proyecto (MIT).

## Reportar Errores

Usamos [GitHub Issues](https://github.com/RayfelO/EMMAX-Angular-.Net-SQLServer/issues) para rastrear bugs.

### Antes de Reportar

- [ ] Actualiza a la última versión del proyecto.
- [ ] Lee la documentación cuidadosamente.
- [ ] Busca issues existentes para evitar duplicados.

### ¿Cómo Reportar un Buen Bug?

> [!WARNING]
> Un buen reporte de bug no debería dejar a otros necesitando más información. Investiga y describe detalladamente.

Incluye lo siguiente:

1. **Título claro y descriptivo**
2. **Pasos de reproducción** exactos
3. **Comportamiento esperado** vs. **comportamiento actual**
4. **Capturas de pantalla o GIFs** si aplica
5. **Entorno:** SO, navegador, versión de .NET/Node.js
6. **Logs o mensajes de error** relevantes

### Plantilla de Bug Report

```markdown
**Descripción:**
Breve descripción del bug.

**Pasos para Reproducir:**
1. Ir a '...'
2. Click en '...'
3. Ver error

**Comportamiento Esperado:**
Descripción de lo que debería pasar.

**Comportamiento Actual:**
Descripción de lo que pasa realmente.

**Screenshots:**
Si aplica, añade screenshots.

**Entorno:**
- OS: [ej. Windows 11, Ubuntu 22.04]
- Navegador: [ej. Chrome 120, Firefox 121]
- Versión del proyecto: [ej. commit abc123]
- Docker: [Sí/No]
```

## Sugerir Mejoras

Las sugerencias de mejora se rastrean como [GitHub Issues](https://github.com/RayfelO/EMMAX-Angular-.Net-SQLServer/issues).

### Antes de Sugerir

- [ ] Asegúrate de usar la última versión.
- [ ] Lee la documentación para verificar si la funcionalidad ya existe.
- [ ] Busca issues existentes con la etiqueta `enhancement`.
- [ ] Considera si tu idea encaja con el alcance del proyecto.

### ¿Cómo Sugerir una Buena Mejora?

1. **Título claro y descriptivo**
2. **Descripción detallada** de la mejora sugerida
3. **Motivación:** ¿Por qué es útil para la mayoría de los usuarios?
4. **Alternativas consideradas**
5. **Screenshots o mockups** si aplica

## Tu Primera Contribución

> [!TIP]
> Busca issues etiquetados como `good first issue` o `help wanted` para empezar.

### Workflow de Contribución

```bash
# 1. Haz fork del repositorio
# 2. Clona tu fork
git clone https://github.com/TU-USUARIO/EMMAX-Angular-.Net-SQLServer.git
cd EMMAX-Angular-.Net-SQLServer

# 3. Crea una rama descriptiva
git checkout -b feature/nombre-de-la-feature
# o
git checkout -b fix/descripcion-del-bug

# 4. Realiza tus cambios y haz commit
git commit -m "feat: descripción clara del cambio"

# 5. Push a tu fork
git push origin feature/nombre-de-la-feature

# 6. Abre un Pull Request en GitHub
```

### Setup de Desarrollo

Consulta la sección [Instalación Detallada](../README.md#-instalación-detallada) del README para configurar tu entorno local.

### Requisitos del Pull Request

- [ ] Tu código compila sin errores (`dotnet build`, `ng build`)
- [ ] Los contenedores Docker levantan correctamente
- [ ] Has probado los cambios localmente
- [ ] Tu PR tiene un título descriptivo y referencia al issue si aplica
- [ ] Has seguido las [guías de estilo](#guías-de-estilo)

## Guías de Estilo

### Código

- Sigue las convenciones de estilo del proyecto existente.
- Mantén las funciones y métodos enfocados y pequeños.
- Escribe nombres descriptivos en inglés para variables y funciones.
- Los comentarios deben explicar el "por qué", no el "qué".

### Documentación

- Actualiza el README si tus cambios afectan la instalación o uso.
- Documenta APIs públicas y funciones complejas.
- Usa español para la documentación del proyecto (README, CONTRIBUTING).

## Mensajes de Commit

Usamos el formato **Conventional Commits**:

```
<tipo>(<alcance>): <descripción corta>

[body opcional]

[footer opcional]
```

### Tipos

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios solo en documentación |
| `style` | Cambios que no afectan la lógica (formato, punto y coma, etc.) |
| `refactor` | Refactorización de código |
| `test` | Añadir o corregir tests |
| `chore` | Tareas de mantenimiento |

### Ejemplos

```bash
feat(product): add image upload to product creation
fix(cart): resolve total calculation with discounts
docs(readme): update installation steps for Docker
test(auth): add unit tests for JWT validation
```

## Reconocimientos

¡Gracias por considerar contribuir a EMMAX Shop! Cada contribución, grande o pequeña, ayuda a mejorar este proyecto. 🎉

Si tienes dudas, no dudes en abrir un issue o contactar a los mantenedores.

---

<div align="center">
  <p><strong>⭐ No olvides darle una estrella al proyecto si te fue útil ⭐</strong></p>
</div>
