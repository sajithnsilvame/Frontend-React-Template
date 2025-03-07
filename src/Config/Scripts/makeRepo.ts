import { fileURLToPath } from 'url'; // ✅ Use fs-extra instead of fs
import * as path from 'path';
import { ensureDir, pathExists, outputFile } from 'fs-extra';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateRepo = async (repoName: string) => {
  const template = `import { IBaseRepository } from '../Config/BaseRepo/BaseRepository';
import { IHttpClient } from '../Config/Infrastructure/http/IHttpClient';

export interface ${repoName} {
  id: number;
  // Add your entity properties here
}

/**
 * By default, this repository enables the I${repoName}Repository interface 
 * by extending IBaseRepository<${repoName}>. 
 * 
 * If it's not necessary, remove this interface 
 * and replace I${repoName}Repository with IBaseRepository<${repoName}> 
 * in the ${repoName}Repository class.
 */

export interface I${repoName}Repository extends IBaseRepository<${repoName}> {
  // Add your custom repository methods here
}

export class ${repoName}Repository implements I${repoName}Repository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<${repoName}[]> {
    return this.httpClient.get<${repoName}[]>(\`/${repoName.toLowerCase()}\`);
  }

  async getById(id: number): Promise<${repoName}> {
    return this.httpClient.get<${repoName}>(\`/${repoName.toLowerCase()}/\${id}\`);
  }

  async create(item: Partial<${repoName}>): Promise<${repoName}> {
    return this.httpClient.post<${repoName}>(\`/${repoName.toLowerCase()}\`, item);
  }

  async update(id: number, item: Partial<${repoName}>): Promise<${repoName}> {
    return this.httpClient.put<${repoName}>(\`/${repoName.toLowerCase()}/\${id}\`, item);
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete(\`/${repoName.toLowerCase()}/\${id}\`);
  }
}`;

  // Define the target directory
  const repoDir = path.join(__dirname, '../../Repositories'); // ✅ Updated correct path
  const filePath = path.join(repoDir, `${repoName}Repository.ts`);

  // Ensure the directory exists
  await ensureDir(repoDir); // ✅ This works now!

  // Check if the file already exists
  if (await pathExists(filePath)) {
    console.log(`❌ Repository for ${repoName} already exists!`);
    return;
  }

  // Write the template to the file
  await outputFile(filePath, template);

  console.log(`✅ Repository for ${repoName} created at src/Repositories/${repoName}Repository.ts`);
};

// Get the entity name from command-line arguments
const repoName = process.argv[2];

if (!repoName) {
  console.error('❌ Please provide a repository name. Example: npm run make:repo Product');
  process.exit(1);
}

// Execute the async function
generateRepo(repoName).catch(error => {
  console.error('Error generating repository:', error);
  process.exit(1);
});

// ================================ Developed By Sajith N Silva =================================
