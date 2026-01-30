# React + TypeScript + Vite

Aplicando UX A PROBLEMAS REALES

El frontend está diseñado para ser intuitivo y fácil de mantener, permitiendo registrar nuevos servicios de manera rápida y sencilla.
Además, se ha aplicado UX basada en casos de uso reales.

Soft Delet

El admin puede eliminar un auto por accidente → soft delete permite restaurarlo rápidamente.

<!-- react-modal: ~17-20 KB (gzipped) -->
Solucionar nomenclatura rest...

El Backend se confundio al nombrar las rutas por ello se creo api.endpoints.ts donde podemos gestionar el nombre de las rutas


Ruta para integrar y renderizar un nuevo servicio.
1. Entidad en domain/entities/
2. Método en ICarRepository
3. Endpoint en api.endpoints.ts
4. Método en car.api.ts
5. Implementación en CarRepositoryImpl
6. Use Case en domain/use-cases/
7. Registrar en DIContainer
8. Query key en queryKeys.ts
9. Agregar al hook useCars
10. Crear componente (si aplica)
11. Usar en la página

----------------------------


