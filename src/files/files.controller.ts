import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploda(@UploadedFile() file: Express.Multer.File): string {
    console.log(file);
    /*
    {
      fieldname: 'file',
      originalname: 'Berserk.jpeg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './uploaded-files',
      filename: '712893d25c2393bee67ceef49a359b9d',
      path: 'uploaded-files\\712893d25c2393bee67ceef49a359b9d',
      size: 96339
    }
    */

    return 'The file was successfully uploaded';
  }

  @Get('download/:id')
  getFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    // Ubicacion del archivo:  C:\Programacion\0) Practicas\NodeJS\NestJS\nest-files-manager\uploaded-files\712893d25c2393bee67ceef49a359b9d
    console.log(
      'Ubicacion del archivo: ',
      join(process.cwd(), 'uploaded-files', id),
    );

    // const file = createReadStream(join(process.cwd(), 'package.json'));
    // const file = createReadStream(join(__dirname, '..', 'uploaded-files', id));
    const file = createReadStream(join(process.cwd(), 'uploaded-files', id));

    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${id}.jpeg"`,
    });

    // return new StreamableFile(file, {
    //   type: '',
    //   disposition: 'attachment; filename="package.json"',
    // });
    return new StreamableFile(file);
  }
}
