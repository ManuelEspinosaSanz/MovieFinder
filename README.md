# 🎬 MovieFinder

Aplicación web moderna para descubrir películas con cartelera contemporánea. Explora películas populares, estrenos en cartelera, próximos lanzamientos y las mejor valoradas.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://movie-finder-daw.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-96.1%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

## 🚀 Demo

Visita la aplicación en vivo: [movie-finder-daw.vercel.app](https://movie-finder-daw.vercel.app)

## ✨ Características

- 🔍 **Búsqueda en tiempo real** - Encuentra películas mientras escribes
- 📂 **Filtrado por categorías**:
  - Popular
  - En Cartelera
  - Próximamente
  - Mejor Valoradas
- 🎭 **Detalles completos** - Sinopsis, valoraciones y más
- 🌓 **Diseño moderno** - Interfaz limpia y responsive
- ⚡ **Rendimiento optimizado** - Carga rápida y fluida
- 📱 **Totalmente responsive** - Funciona en todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: [Next.js 15](https://nextjs.org/) - React Framework
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- **Estilos**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- **Componentes**: Propios - Componentes reutilizables
- **API**: [TMDB API](https://www.themoviedb.org/documentation/api) - Datos de películas
- **Deployment**: [Vercel](https://vercel.com/) - Hosting y CI/CD

## 📦 Instalación

### Requisitos previos

- Node.js 18+ 
- npm, pnpm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/ManuelEspinosaSanz/MovieFinder.git
cd MovieFinder
```

2. **Instalar dependencias**
```bash
npm install
# o
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_aqui
```

Para obtener una API key:
1. Regístrate en [TMDB](https://www.themoviedb.org/signup)
2. Ve a tu perfil → Configuración → API
3. Solicita una API key (es gratis)

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta el linter |

## 📁 Estructura del Proyecto

```
MovieFinder/
├── app/              # App Router de Next.js
├── components/       # Componentes React
│   └── ui/          # Componentes de shadcn/ui
├── hooks/           # Custom React Hooks
├── lib/             # Utilidades y configuración
├── public/          # Archivos estáticos
├── styles/          # Estilos globales
└── package.json     # Dependencias
```

## 🎨 Funcionalidades Destacadas

### Búsqueda Inteligente
La búsqueda se actualiza en tiempo real mientras escribes, ofreciendo resultados instantáneos sin necesidad de presionar Enter.

### Categorías Dinámicas
Explora películas organizadas en cuatro categorías principales, cada una con su propia vista optimizada.

### Interfaz Responsive
Diseñada mobile-first, la aplicación se adapta perfectamente a cualquier tamaño de pantalla.

## 🚀 Deployment

La aplicación está configurada para desplegarse automáticamente en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura la variable de entorno `NEXT_PUBLIC_TMDB_API_KEY`
3. Deploy automático con cada push a `main`

## 📝 API Reference

Este proyecto utiliza [The Movie Database (TMDB) API](https://developers.themoviedb.org/3):

- `/movie/popular` - Películas populares
- `/movie/now_playing` - En cartelera
- `/movie/upcoming` - Próximos estrenos
- `/movie/top_rated` - Mejor valoradas
- `/search/movie` - Búsqueda de películas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o encuentras bugs:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Manuel Espinosa**

- Portfolio: [manuelespinosa.dev](https://manuelespinosa.dev)
- GitHub: [@ManuelEspinosaSanz](https://github.com/ManuelEspinosaSanz)
- LinkedIn: [Manuel Espinosa](https://linkedin.com/in/manuelespinosasanz)

## 🙏 Agradecimientos

- [TMDB](https://www.themoviedb.org/) por proporcionar la API gratuita
- [Vercel](https://vercel.com/) por el hosting

---

⭐ Si te gustó este proyecto, considera darle una estrella en GitHub!
