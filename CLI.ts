#!/usr/bin/env node
import { Command } from 'commander';
import pc from 'picocolors';
import * as fs from 'fs';
import * as path from 'path';
import * as p from '@clack/prompts';
import { ZipArchive } from 'archiver';


const program = new Command();

program
  .name('media-backup')
  .description('Zip-tool')
  .version('1.0.0')
  .argument('[dir]', 'Директория для сканирования (опционально)')
  .option('-s, --size <size>', 'Минимальный размер файла в МБ', '15')
  .action(async (dir: string | undefined, options: { size: string }) => {
    let targetDir = dir;

    console.log(('\n 📂 Welcome to Cli-encrypt-tool 📂 \n'));

    if (!targetDir) {
      const selectedDir = await p.text({
        message: 'Enter the path to the directory to be scanned:',
        placeholder: './media',
        validate(value) {
          if (!value?.trim()) return 'The path cannot be empty!';
        },
      });

      if (p.isCancel(selectedDir)) {
        console.log(pc.yellow('\n Exit...'));
        process.exit(0);
      }

      targetDir = selectedDir as string;
    }

    // Приводим путь к абсолютному виду
    targetDir = path.resolve(targetDir);

    // Проверяем существование папки
    try {
      await fs.promises.access(targetDir);
      const stat = await fs.promises.stat(targetDir);
      if (!stat.isDirectory()) {
        console.log(pc.red(`ERROR PATH: "${targetDir}" not a folder`));
        process.exit(1);
      }
    } catch {
      console.log(pc.red(`❓ Error: Directory "${targetDir}"does not exist or is unavailable.`));
      process.exit(1);
    }

    // 2. Спрашиваем, нужно ли сжимать файлы
    const shouldZip = await p.confirm({
      message: 'Compress the large files found into a ZIP archive?',
      initialValue: true,
    });

    if (p.isCancel(shouldZip)) {
      console.log(pc.yellow('\n Exit...'));
      process.exit(0);
    }

    console.log(pc.gray(`\n Looking for larger files: ${options.size} Mb in "${targetDir}"...\n`));

    // Запускаем сканирование
    const minSizeMb = parseFloat(options.size);
    await scanDirectory(targetDir, minSizeMb, shouldZip);
    console.log(pc.blue('\n🛠️   Scanning completed successfully.'));
  });

// Функция для архивации файла в Zip
async function zipFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const zipPath = `${filePath}.zip`;
    const output = fs.createWriteStream(zipPath);
    
    // Создаем экземпляр архиватора
    const archive = new ZipArchive({ zlib: { level: 0 } }); 


    output.on('close', () => resolve(zipPath));
    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    archive.file(filePath, { name: path.basename(filePath) });
    archive.finalize();
  });
}

export async function scanDirectory(currentPath: string, minSizeMb: number, shouldZip: boolean) {
  try {
    const files = await fs.promises.readdir(currentPath);

    for (const file of files) {
      const fullPath = path.join(currentPath, file);

      try {
        const stat = await fs.promises.lstat(fullPath);

        if (stat.isSymbolicLink()) {
          continue; 
        }

        if (stat.isDirectory()) {
          await scanDirectory(fullPath, minSizeMb, shouldZip);
        } else if (stat.isFile()) {
          if (file.endsWith('.zip')) continue;

          const fileSizeMb = stat.size / (1024 * 1024);
          
          if (fileSizeMb >= minSizeMb) {
            console.log(
              `${pc.yellow('Large file found:')} ${file} ${pc.green(`[${fileSizeMb.toFixed(2)} Mb]`)}`
            );

            if (shouldZip) {
  const spinner = p.spinner();
  spinner.start(`File archiving ${file}...`);
  
  try {
    const resultPath = await zipFile(fullPath);
    
    // Удаляем исходный файл после успешного создания zip-архива
    await fs.promises.unlink(fullPath);
    
    spinner.stop(`${pc.green('✅ Zip created & original deleted:')} ${path.basename(resultPath)}`);
  } catch (zipErr) {
    spinner.stop(`${pc.red('❌ File compression/deletion error')} ${file}`);
    console.log(zipErr);
  }
}

          }
        }
      } catch (fileError) {
        console.error(pc.red(`⚠️ No access to the file/folder: ${fullPath}`));
      }
    }
  } catch (dirError) {
    console.error(pc.red(`❌ Error reading directory ${currentPath}`));
  }
}

program.parse(process.argv);
