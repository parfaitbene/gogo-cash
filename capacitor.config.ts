import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gogocash',
  appName: 'GoGoCash',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.43.30:8100",
    cleartext: true
  },
};

export default config;
