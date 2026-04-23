# Vestibular API Client

Cliente TypeScript para comunicação com a API do sistema vestibular, organizado em módulos especializados para admin e app.

## Instalação

```bash
npm install @gmsarates/vestibular-api-client
```

## Configuração

Configure a base URL uma única vez no início da sua aplicação:

```typescript
import { setBaseUrl } from "@gmsarates/vestibular-api-client";

// Configure no início da aplicação
setBaseUrl("https://sua-api.com/api");

// Ou para diferentes ambientes:
if (process.env.NODE_ENV === "production") {
  setBaseUrl("https://api.producao.com/api");
} else {
  setBaseUrl("http://localhost:3000/api");
}
```

## Estrutura de Arquivos

```
src/
├── admin/             # Módulos para interface admin
│   ├── types.ts       # Tipos específicos do admin
│   ├── client.ts      # HttpClient para admin
│   ├── auth.ts        # AuthService admin
│   ├── candidates.ts  # CandidateService admin
│   ├── universities.ts# UniversityService admin
│   ├── exams.ts       # ExamService admin
│   ├── courses.ts     # CourseService admin
│   ├── users.ts       # UserService admin
│   └── index.ts       # Exportações admin
├── app/               # Módulos para interface app
│   ├── types.ts       # Tipos específicos do app
│   ├── client.ts      # HttpClient para app
│   ├── auth.ts        # AuthService app
│   ├── candidates.ts  # CandidateService app
│   ├── universities.ts# UniversityService app
│   ├── exams.ts       # ExamService app
│   ├── courses.ts     # CourseService app
│   └── index.ts       # Exportações app
├── index.ts           # Exportações centralizadas
└── example.ts         # Exemplos de uso
```

## Uso

### Importar tipos
```typescript
import type { Candidate, University, Exam, Course, User } from "@gmsarates/vestibular-api-client";
```

### Usar serviços (Admin)
```typescript
import { authApi, candidateApi, universityApi, examApi, courseApi, userApi } from "@gmsarates/vestibular-api-client";

// Autenticação
const response = await authApi.login({ email: "admin@example.com", password: "123456" });
const user = await authApi.getMe();
await authApi.logout();

// Candidatos
const candidates = await candidateApi.list();
const candidate = await candidateApi.create({
  name: "João Silva",
  email: "joao@example.com",
  document: "123456789",
  phone: "11999999999",
  university_id: "university-1"
});
await candidateApi.update(id, { name: "João Silva Atualizado" });
await candidateApi.delete(id);

// Universidades
const universities = await universityApi.list();
const university = await universityApi.create({
  name: "Universidade Federal",
  slug: "uf"
});
await universityApi.update(id, { name: "Universidade Federal Atualizada" });
await universityApi.delete(id);

// Exames
const exams = await examApi.list();
const exam = await examApi.create({
  name: "Vestibular 2024",
  university_id: "university-1"
});

// Cursos
const courses = await courseApi.list();
const course = await courseApi.create({
  name: "Engenharia Civil",
  university_id: "university-1"
});

// Usuários
const users = await userApi.list();
const newUser = await userApi.create({
  name: "Administrador",
  email: "admin@example.com",
  password: "123456"
});
```

### Usar serviços (App)
```typescript
import { appAuthApi, appCandidateApi, appUniversityApi, appExamApi, appCourseApi } from "@gmsarates/vestibular-api-client";

// Mesmo padrão, mas com prefixo 'app' para evitar conflitos
const candidates = await appCandidateApi.list();
const universities = await appUniversityApi.list();
```

## Funcionalidades

- ✅ **Configuração dinâmica da base URL** - Configure uma vez, use em qualquer lugar
- ✅ **Compatível com múltiplos ambientes** - React, Node.js, scripts puros
- ✅ **Sem dependências externas** - Apenas fetch API nativa
- ✅ **TypeScript completo** - Tipagem forte em todas as operações
- ✅ **JSON:API normalization** - Converte automaticamente relacionamentos
- ✅ **Autenticação automática** - Gerencia tokens JWT automaticamente
- ✅ **Tratamento de erros** - Mensagens de erro padronizadas
- ✅ **Lazy initialization** - Cliente HTTP criado apenas quando necessário

## Tratamento de Relacionamentos

O cliente normaliza automaticamente respostas JSON:API, convertendo relacionamentos em objetos aninhados:

```typescript
// Resposta da API (JSON:API)
{
  "data": {
    "id": "1",
    "type": "candidate",
    "attributes": { "name": "João" },
    "relationships": {
      "university": { "data": { "id": "1", "type": "university" } }
    }
  },
  "included": [{
    "id": "1",
    "type": "university",
    "attributes": { "name": "UFABC" }
  }]
}

// Objeto normalizado retornado pelo cliente
{
  "id": "1",
  "name": "João",
  "university_id": "1",
  "university": {
    "id": "1",
    "name": "UFABC"
  }
}
```
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
