# Perfiles de docentes

## Identificadores de materias en perfiles

El frontend genera un identificador determinístico para cada materia a partir del nombre normalizado (`generateSubjectProfileId`). A partir de esta actualización:

1. El backend almacena `subject_id` como ese identificador generado (hasta 36 caracteres en minúsculas).
2. Se persiste también `subject_name`, proveniente del catálogo o enviado por el cliente.
3. Todos los endpoints relacionados con perfiles (`GET /profiles`, `GET /profile/:id`, sockets, etc.) devuelven ambos campos.

### Compatibilidad retroactiva

Durante la transición se aceptan también IDs legacy (UUID del catálogo). La lógica normaliza tanto IDs legacy como generados para que no se pierdan asociaciones existentes.

## Migración de datos históricos

Se añadió el script `npm run profiles:migrate` que actualiza los registros existentes en la tabla `perfiles`.

```bash
# Ejecución simulada (no aplica cambios)
npm run profiles:migrate -- --dry-run

# Ejecución real
npm run profiles:migrate
```

El script busca el nombre de la materia en el catálogo interno y actualiza `subject_id`/`subject_name`. Los registros sin nombre se reportan para intervención manual.

## Integraciones externas

Cualquier servicio que cree materias o perfiles fuera del frontend debe replicar la misma lógica de normalización. La utilidad `src/backEnd/utils/subjectProfile.js` está disponible en el backend para centralizar la generación de identificadores.

### Campos expuestos en el login / sesión

El endpoint de autenticación devuelve en `perfil` y `userPerfil` la misma clave `subject_id` descrita arriba. Cada entrada del arreglo `userPerfil` tiene la forma:

```json
{
  "subject_id": "redesavanzadas",
  "subject_name": "REDES AVANZADAS",
  "legacy_subject_id": "6bcf1cb9-1cb7-4a34-9b0d-82390d3536b8"
}
```

- `subject_id` = `generateSubjectProfileId(subject_name)`.
- `subject_name` corresponde al nombre almacenado (del catálogo o provisto por el cliente).
- `legacy_subject_id` sólo se incluye cuando existe un UUID histórico distinto al identificador normalizado.

El frontend debe comparar perfiles utilizando `subject_id`, que es el mismo que reciben los docentes (`teacher.perfil`).
