import detectPort from 'detect-port';
import ServerConfig from '../server.config';

const _checkPort = () => {
  const target_port = ServerConfig.server.port
  detectPort(target_port).then(
    (available_port) => {
        if(available_port!==target_port){
            
        }
    },
    (reason: any) => {}
  );
};

const _checkSpace = () => {};

const _checkPrivilege = () => {};

const checkEnv = () => {
  _checkPort();
  _checkSpace();
  _checkPrivilege();
};

export default checkEnv;
