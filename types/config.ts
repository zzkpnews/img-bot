interface ServerConfig {
  server: {
    hostname: string;
    port: number;
    protocol: 'http' | 'https';
  };
  token: string;
  data: {
    spaceBudget: number;
    warningDemarcation: number;
    datapath: string;
  };
}
