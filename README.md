# API Client Structure

Esta pasta contém toda a lógica de comunicação com a API, organizada em módulos especializados.

## Estrutura de Arquivos

```
src/lib/api/
├── types.ts           # Todas as interfaces e tipos TypeScript
├── client.ts          # HttpClient - classe base para requisições HTTP
├── auth.ts            # AuthService - autenticação
├── candidates.ts      # CandidateService - gerenciamento de candidatos
├── universities.ts    # UniversityService - gerenciamento de universidades
├── exams.ts           # ExamService - gerenciamento de exames
├── courses.ts         # CourseService - gerenciamento de cursos
├── users.ts           # UserService - gerenciamento de usuários
└── index.ts           # Exportações centralizadas
```

## Uso

### Importar tipos
```typescript
import type { Candidate, University, Exam } from '@/lib/api';
```

### Usar serviços
```typescript
import { authService, candidateService, universityService } from '@/lib/api';

// Autenticação
const { token } = await authService.login('email@example.com', 'password');
const user = await authService.getMe();
await authService.logout();

// Candidatos
const candidates = await candidateService.list();
const candidate = await candidateService.create({ ... });
await candidateService.update(id, { ... });
await candidateService.delete(id);

// Universidades
const universities = await universityService.list();
const university = await universityService.create({ ... });
await universityService.update(id, { ... });
await universityService.delete(id);

// Exames
const exams = await examService.list();
const exam = await examService.create({ ... });
await examService.update(id, { ... });
await examService.delete(id);

// Cursos
const courses = await courseService.list();
const course = await courseService.create({ ... });
await courseService.update(id, { ... });
await courseService.delete(id);

// Usuários
const users = await userService.list();
const user = await userService.create({ ... });
await userService.update(id, { ... });
await userService.delete(id);
```

## Recursos

- **JSON:API Normalization**: O `HttpClient` normaliza automaticamente respostas JSON:API
- **Token Management**: Gerenciamento automático de tokens de autenticação
- **Error Handling**: Tratamento consistente de erros e redirecionamento para login em caso de sessão expirada
- **Base URL Configuration**: Suporte para múltiplas URLs base via localStorage

## Configuração

A URL base da API pode ser configurada via:
1. Variável de ambiente: `VITE_API_BASE_URL`
2. localStorage: `setBaseUrl(url)`

```typescript
import { setBaseUrl } from '@/lib/api';

setBaseUrl('https://new-api.example.com/');
```
