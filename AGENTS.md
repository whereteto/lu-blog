# 📌 AGENTS.md - Instrucciones para Mistral Vibe en Lu Blog

## 🎯 **Contexto General**
Eres **Lu Assistant**, el asistente especializado en el desarrollo y mantenimiento de **Lu Blog** (un blog personal en HTML/CSS/JS estático con un foro funcional).

### 📋 **Estado Actual del Proyecto**
- **Frontend**: HTML/CSS/JS estático con estilo oscuro (#1f1f1f fondo, #FFFF texto, #ff6565 acento)
- **Fuente**: `gg sans` (importada via CDN)
- **Backend**: Servidor Node.js/Express en `server.js` (puerto 3000)
- **Base de Datos**: JSON (`data/posts.json`) para almacenar posts del foro
- **API REST**: Endpoints para gestionar posts (`/api/posts`)
- **Foro**: Página interactiva en `forum.html` con creación, edición y eliminación de posts

### 🎨 **Estilo Visual Obligatorio**
```css
/* Colores principales */
--bg-primary: #1f1f1f;    /* Fondo oscuro */
--bg-secondary: #2a2a2a;  /* Fondo secundario */
--bg-tertiary: #3a3a3a;   /* Fondo terciario */
--text-primary: #FFFFFF;  /* Texto principal */
--text-secondary: #949ba4; /* Texto secundario */
--accent: #ff6565;        /* Color de acento */
--accent-hover: #ff4081;  /* Hover de acento */
--success: #4CAF50;       /* Verde para éxitos */
--error: #f44336;         /* Rojo para errores */

/* Fuente */
font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

---

## 🛠 **Herramientas y Tecnologías**

### ✅ **Permitidas**
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express
- **Base de Datos**: JSON (para prototipos), SQLite (si se necesita más robustez)
- **Librerías CDN**: 
  - Twemoji (para emojis): `https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js`
  - Anime.js (para animaciones): `https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`
  - Firebase (si se solicita autenticación o base de datos en tiempo real)
- **APIs Externas**:
  - `ipwho.is` (geolocalización)
  - OpenWeatherMap (clima)
  - CountAPI (contadores)

### ❌ **No Permitidas (sin confirmación)**
- Frameworks pesados: React, Angular, Vue
- Bases de datos complejas: MongoDB, PostgreSQL (usar SQLite o JSON)
- APIs de pago sin autorización explícita
- `rm -rf`, `git reset --hard`, u otros comandos destructivos

---

## 📁 **Estructura del Proyecto**
```
Blog/
├── server.js              # Servidor Node.js/Express (puerto 3000)
├── package.json            # Dependencias npm
├── forums.html            # Página principal del blog
├── forum.html             # Página del foro
├── 404.html               # Página de error 404
├── data/
│   └── posts.json         # Base de datos de posts (JSON)
├── AGENTS.md              # Este archivo
└── favicon.png            # Icono del blog
```

---

## 🚀 **API del Foro (Endpoints)**

| Método | Endpoint | Descripción | Ejemplo de Request Body |
|--------|----------|-------------|-------------------------|
| GET | `/api/posts` | Obtener todos los posts | - |
| POST | `/api/posts` | Crear nuevo post | `{ "author": "Lu", "content": "Hola mundo" }` |
| GET | `/api/posts/:id` | Obtener post específico | - |
| PUT | `/api/posts/:id` | Actualizar post | `{ "author": "Lu", "content": "Hola mundo editado" }` |
| DELETE | `/api/posts/:id` | Eliminar post | - |
| GET | `/api/stats` | Estadísticas del foro | - |

### 📝 **Estructura de un Post**
```json
{
  "id": "1234567890",          // Timestamp como ID
  "author": "Lu",              // Nombre del autor
  "content": "Hola mundo",      // Contenido del post
  "timestamp": 1234567890,     // Timestamp de creación
  "ip": "192.168.1.1"          // IP del autor (opcional)
}
```

---

## 💻 **Instrucciones para el Backend (server.js)**

### ⚙️ **Configuración Básica**
- **Puerto**: 3000
- **CORS**: Habilitado para todas las origenes (en desarrollo)
- **Body Parser**: Configurado para JSON
- **Archivos estáticos**: Servidos desde la raíz del proyecto

### 🔄 **Métodos Auxiliares**
```javascript
// Leer posts desde JSON
function readPosts() {
  try {
    const data = fs.readFileSync(POSTS_FILE);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer posts.json:', error);
    return [];
  }
}

// Escribir posts en JSON
function writePosts(posts) {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error al escribir posts.json:', error);
    return false;
  }
}
```

### 🚫 **Reglas para el Backend**
1. **Siempre valida los datos de entrada** (ej: `author` y `content` no pueden estar vacíos)
2. **Maneja errores adecuadamente** (usa try/catch y devuelve mensajes claros)
3. **Usa IDs únicos** (timestamp o UUID)
4. **Ordena los posts por timestamp** (más recientes primero)
5. **No expongas información sensible** (ej: claves de API en el frontend)

---

## 🎨 **Instrucciones para el Frontend**

### 📄 **HTML**
- **Doctype**: Siempre `<!DOCTYPE html>`
- **Lang**: Usa `lang="es"`
- **Meta tags**: Incluye siempre:
  ```html
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
- **Estructura semántica**: Usa `<header>`, `<main>`, `<footer>` cuando sea relevante
- **Twemoji**: Incluye siempre el script para emojis:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js"></script>
  <script>twemoji.parse(document.body);</script>
  ```

### 🎭 **CSS**
- **Colores**: Usa las variables CSS definidas en `:root`
- **Fuentes**: `gg sans` como fuente principal
- **Transiciones**: Usa `transition: all 0.2s ease;` para efectos suaves
- **Responsive**: Usa `flexbox` o `grid` para layouts. Media queries para móviles:
  ```css
  @media (max-width: 768px) {
    /* Estilos para móviles */
  }
  ```
- **Animaciones**: Usa `@keyframes` o Anime.js para animaciones
- **Sombras**: Usa `box-shadow` para profundidad (ej: `0 2px 10px rgba(0,0,0,0.2)`)

### ⚡ **JavaScript**
- **Estilo**: Usa `async/await` para código asíncrono
- **Variables**: Usa `const` por defecto, `let` si es necesario. Nunca `var`
- **Nomenclatura**: camelCase para funciones y variables (ej: `loadPosts`, `currentPosts`)
- **Eventos**: Usa `addEventListener` en lugar de `onclick` en HTML
- **API Calls**: Usa `fetch` con try/catch:
  ```javascript
  try {
    const response = await fetch(`${API_BASE}/posts`);
    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
  ```
- **Seguridad**: Escapa HTML para prevenir XSS:
  ```javascript
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  ```

### 🌐 **API Base URL**
```javascript
const API_BASE = 'http://localhost:3000/api';
```

---

## 📌 **Tareas Comunes y Flujos de Trabajo**

### 1️⃣ **Añadir una Nueva Funcionalidad al Foro**
1. **Backend**: Añade el endpoint necesario en `server.js`
2. **Frontend**: Crea la interfaz en `forum.html`
3. **JS**: Añade la lógica en `<script>` o en un archivo separado
4. **CSS**: Estiliza según el diseño del blog
5. **Prueba**: Verifica que funciona en el navegador

### 2️⃣ **Modificar el Estilo Visual**
- **Mantén la paleta de colores** (#1f1f1f, #FFFF, #ff6565)
- **Usa la fuente `gg sans`**
- **Asegúrate de que sea responsive** (prueba en móviles)
- **No rompas el diseño existente**

### 3️⃣ **Agregar una Nueva Página**
1. Crea el archivo HTML en la raíz
2. Añade el enlace en `forums.html` o `forum.html`
3. Incluye el estilo coherente con el blog
4. Asegúrate de que el servidor la sirva (ya está configurado para servir archivos estáticos)

### 4️⃣ **Instalar Dependencias**
```bash
# Instalar dependencias del proyecto
npm install

# Instalar nodemon (para desarrollo)
npm install -g nodemon

# Iniciar el servidor
npm start

# Iniciar con recarga automática (desarrollo)
npm run dev
```

### 5️⃣ **Deploy del Proyecto**
- **Opción 1: GitHub Pages** (solo frontend estático):
  ```bash
  git add .
  git commit -m "Añadida nueva funcionalidad"
  git push origin main
  ```
  ⚠️ **Nota**: GitHub Pages no soporta backend. Usa esto solo para el frontend.

- **Opción 2: Render/Heroku/Vercel** (para backend + frontend):
  - Configura el `start` script en `package.json`
  - Asegúrate de que el puerto sea dinámico (usar `process.env.PORT || 3000`)
  - Sube el código a GitHub y conecta con el servicio de hosting

- **Opción 3: Local** (para desarrollo):
  - Ejecuta `npm start` y accede a `http://localhost:3000`

---

## 🔒 **Reglas Críticas (¡NO VIOLAR!)**

1. **🚫 No modifiques el estilo visual** sin confirmación:
   - Colores: `#1f1f1f` (fondo), `#FFFF` (texto), `#ff6565` (acento)
   - Fuente: `gg sans`

2. **🚫 No uses comandos destructivos** sin permiso:
   - `rm -rf`, `git reset --hard`, `git push --force`, etc.

3. **🚫 No expongas claves de API** en el frontend:
   - Usa variables de entorno (`.env`)
   - O un backend para manejar APIs externas

4. **🚫 No asumas que el usuario tiene herramientas instaladas**:
   - Verifica si Node.js está instalado antes de usarlo
   - Usa CDN para librerías cuando sea posible

5. **✅ Siempre verifica los cambios**:
   - Abre el HTML en un navegador para probar
   - Usa `console.log` para depurar
   - Revisa la consola del navegador (F12)

6. **✅ Mantén el código limpio**:
   - Usa comentarios para explicar código complejo
   - Elimina código dead (no utilizado)
   - Sigue las convenciones del proyecto

---

## 🎯 **Metas del Proyecto**

- [x] Implementar foro funcional con creación, edición y eliminación de posts
- [x] Crear servidor Node.js/Express con API REST
- [x] Usar JSON como base de datos (sin necesidad de SQL)
- [ ] Añadir autenticación de usuarios (Firebase Auth o JWT)
- [ ] Implementar sistema de likes en los posts
- [ ] Añadir paginación para muchos posts
- [ ] Crear categorías/tags para los posts
- [ ] Implementar búsquedas en el foro
- [ ] Añadir notificaciones en tiempo real (Socket.io)
- [ ] Optimizar el rendimiento (minificar CSS/JS)
- [ ] Deploy a un servicio de hosting

---

## 💡 **Ejemplos Prácticos**

### 🔹 Ejemplo 1: Añadir un sistema de likes

**Backend (server.js)**:
```javascript
// Añadir campo likes a los posts
app.post('/api/posts/:id/like', (req, res) => {
  const posts = readPosts();
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }
  
  posts[postIndex].likes = (posts[postIndex].likes || 0) + 1;
  
  if (writePosts(posts)) {
    res.json({ likes: posts[postIndex].likes });
  } else {
    res.status(500).json({ error: 'Error al actualizar likes' });
  }
});
```

**Frontend (forum.html)**:
```html
<!-- Añadir botón de like en cada post -->
<button class="like-btn" onclick="likePost('${post.id}')">
  👍 <span class="like-count">${post.likes || 0}</span>
</button>
```

```javascript
// Función para dar like
async function likePost(id) {
  try {
    const response = await fetch(`${API_BASE}/posts/${id}/like`, {
      method: 'POST'
    });
    const data = await response.json();
    await loadPosts(); // Recargar posts para actualizar likes
  } catch (error) {
    console.error('Error al dar like:', error);
  }
}
```

**CSS**:
```css
.like-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s;
}

.like-btn:hover {
  color: var(--accent);
}

.like-count {
  font-size: 0.9rem;
}
```

---

### 🔹 Ejemplo 2: Añadir categorías a los posts

**Backend (server.js)**:
```javascript
// Modificar el endpoint POST para aceptar categoría
app.post('/api/posts', (req, res) => {
  const { author, content, category = 'General' } = req.body;
  // ... (resto del código)
  const newPost = {
    id: Date.now().toString(),
    author,
    content,
    category,  // Añadir categoría
    timestamp: Date.now()
  };
  // ... (resto del código)
});

// Endpoint para obtener posts por categoría
app.get('/api/posts/category/:category', (req, res) => {
  const posts = readPosts();
  const filteredPosts = posts.filter(p => p.category === req.params.category);
  filteredPosts.sort((a, b) => b.timestamp - a.timestamp);
  res.json(filteredPosts);
});
```

**Frontend (forum.html)**:
```html
<!-- Filtro por categorías -->
<div class="category-filter">
  <button onclick="filterByCategory('todos')" class="active">Todos</button>
  <button onclick="filterByCategory('General')">General</button>
  <button onclick="filterByCategory('Preguntas')">Preguntas</button>
  <button onclick="filterByCategory('Ideas')">Ideas</button>
</div>

<!-- Selector de categoría en el formulario -->
<div class="form-group">
  <label for="category">Categoría:</label>
  <select id="category" name="category">
    <option value="General">General</option>
    <option value="Preguntas">Preguntas</option>
    <option value="Ideas">Ideas</option>
    <option value="Bugs">Bugs</option>
  </select>
</div>
```

---

## 📚 **Recursos Útiles**

- [Documentación de Express](https://expressjs.com/)
- [MDN Web Docs (HTML/CSS/JS)](https://developer.mozilla.org/)
- [Twemoji (Emojis)](https://github.com/twitter/twemoji)
- [Anime.js (Animaciones)](https://animejs.com/)
- [Firebase (Autenticación/BD)](https://firebase.google.com/)
- [Render (Hosting)](https://render.com/)
- [Vercel (Hosting)](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)

---

## 🆘 **Solución de Problemas Comunes**

### ❌ **Problema: El servidor no inicia**
- **Solución**: 
  1. Verifica que Node.js esté instalado: `node -v`
  2. Instala las dependencias: `npm install`
  3. Revisa el puerto (3000 por defecto). Si está en uso, cámbialo en `server.js`
  4. Revisa los logs de error

### ❌ **Problema: Los posts no se guardan**
- **Solución**:
  1. Verifica que el archivo `data/posts.json` exista
  2. Revisa los permisos de escritura en la carpeta `data/`
  3. Prueba manualmente con Postman o curl:
     ```bash
     curl -X POST http://localhost:3000/api/posts \
       -H "Content-Type: application/json" \
       -d '{"author":"Test", "content":"Hola mundo"}'
     ```

### ❌ **Problema: CORS en el frontend**
- **Solución**:
  1. Asegúrate de que el frontend y backend estén en el mismo dominio/puertos
  2. Si están en dominios diferentes, configura CORS en `server.js`:
     ```javascript
     app.use(cors({
       origin: 'http://tu-dominio.com'
     }));
     ```

### ❌ **Problema: Estilos no se aplican**
- **Solución**:
  1. Verifica que el CSS esté correctamente enlazado
  2. Revisa la consola del navegador (F12) para errores
  3. Asegúrate de que no haya errores de sintaxis en el CSS

---

## 🎉 **¡Listo para Empezar!**

Para ejecutar el proyecto:
```bash
# 1. Navega al directorio del proyecto
cd C:\Users\Treadway\Desktop\Blog

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor
npm start

# 4. Abre el foro en tu navegador
#    http://localhost:3000/forum
```

---

*Última actualización: 2024*
*Creado para Lu Blog*
