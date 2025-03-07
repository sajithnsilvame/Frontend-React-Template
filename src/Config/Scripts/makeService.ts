import { fileURLToPath } from 'url';
import * as path from 'path';
import { ensureDir, pathExists, outputFile } from 'fs-extra';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateService = async (serviceName: string) => {
  const template = `import { I${serviceName}Repository } from '../Repositories/${serviceName}Repository';

export interface ${serviceName} {
id: number;
// Add your entity properties here
}

export interface I${serviceName}Service {
  getAll${serviceName}s(): Promise<${serviceName}[]>;
  get${serviceName}ById(id: number): Promise<${serviceName}>;
  create${serviceName}(data: Partial<${serviceName}>): Promise<${serviceName}>;
  update${serviceName}(id: number, data: Partial<${serviceName}>): Promise<${serviceName}>;
  delete${serviceName}(id: number): Promise<void>;
}

export class ${serviceName}Service implements I${serviceName}Service {
  constructor(private readonly ${serviceName.toLowerCase()}Repository: I${serviceName}Repository) {}

  async getAll${serviceName}s(): Promise<${serviceName}[]> {
    return this.${serviceName.toLowerCase()}Repository.getAll();
  }

  async get${serviceName}ById(id: number): Promise<${serviceName}> {
    return this.${serviceName.toLowerCase()}Repository.getById(id);
  }

  async create${serviceName}(data: Partial<${serviceName}>): Promise<${serviceName}> {
    return this.${serviceName.toLowerCase()}Repository.create(data);
  }

  async update${serviceName}(id: number, data: Partial<${serviceName}>): Promise<${serviceName}> {
    return this.${serviceName.toLowerCase()}Repository.update(id, data);
  }

  async delete${serviceName}(id: number): Promise<void> {
    return this.${serviceName.toLowerCase()}Repository.delete(id);
  }
}

`;

  // Define the target directory
  const serviceDir = path.join(__dirname, '../../Services'); // ✅ Ensure correct directory
  const filePath = path.join(serviceDir, `${serviceName}Service.ts`);

  // Ensure the directory exists
  await ensureDir(serviceDir); 

  // Check if the file already exists
  if (await pathExists(filePath)) {
    console.log(`❌ Service for ${serviceName} already exists!`);
    return;
  }

  // Write the template to the file
  await outputFile(filePath, template);

  console.log(`✅ Service for ${serviceName} created at src/Services/${serviceName}Service.ts`);
};

// Get the service name from command-line arguments
const serviceName = process.argv[2];

if (!serviceName) {
  console.error('❌ Please provide a service name. Example: npm run make:service Product');
  process.exit(1);
}

// Execute the async function
generateService(serviceName).catch(error => {
  console.error('Error generating service:', error);
  process.exit(1);
});

// ================================ Developed By Sajith N Silva =================================
