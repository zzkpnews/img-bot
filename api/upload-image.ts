import colors from 'colors';
import formidable from 'formidable';
import { Express } from 'express';
import { UploadResponse } from '../types/response';
import uuid from 'uuid';
import ServerConfig from '../server.config';

const createFileId = (): string => {
  return uuid.v4().replace(/-/g, '');
};

const createFileName = (file_id: string, extension_name: string): string => {
  return `${file_id}${extension_name}`;
};

const createImageURL = () => {};

export const useUploadRoute = (app: Express, host: string, port: number) => {
  app.post('/upload-image', (req, res) => {
    let currentFilename: string;
    let currentFileId: string;

    const form = formidable({
      multiples: true,
      uploadDir: 'images',
      keepExtensions: true,
      filename: (_name, ext) => {
        currentFileId = createFileId();
        currentFilename = createFileName(currentFileId, ext);
        return currentFilename;
      },
    });

    form.on('file', (formname, file) => {
      form.emit('data', { name: 'file', formname, value: file });
    });

    form.parse(req, (err, _fields, files) => {
      res.header('Access-Control-Allow-Origin', '*');
      let response: UploadResponse = {
        status: 'ok',
      };
      if (err) {
        response.status = 'err';
        response.message = err;
        res.json(response);
      }
      if (files['upload_image'] === undefined) {
        response.status = 'err';
        response.message = "You must upload a file with the name of 'upload_image'.";
        res.json(response);
      }
      response.id = currentFileId;
      response.url = `http://${host}:${port}/images/${currentFilename}`;
      res.json(response);
    });
  });

  console.log(colors.green('Upload route is working...'));
};
