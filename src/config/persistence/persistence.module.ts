/* 
  1. The PersistenceModule is responsible for configuring the connection to the database. 
  2. The MongooseModule.forRootAsync method is used to configure the connection to the database. 
  3. The useFactory function is responsible for returning the connection configuration object. 
  4. The inject property is used to inject the configuration object into the useFactory function.
 */

  import { Global, Module } from '@nestjs/common';
  import { ConfigType } from '@nestjs/config';
  import { MongooseModule } from '@nestjs/mongoose';
  import dbConfig from './db-config';
  
  @Global()
  @Module({
    imports: [
      MongooseModule.forRootAsync({
        useFactory: (configService: ConfigType<typeof dbConfig>) => {
          const { db, env } = configService;
          const uriDb =
            env === 'local'
              ? `${db.connection}${db.host}/${db.name}`
              : `${db.host}/${db.user}:${db.password}${db.cluster}/${db.name}?retryWrites=true&w=majority`;
          return {
            uri: uriDb,
          };
        },
        inject: [dbConfig.KEY],
      }),
    ],
  })
  export class persistenceModule {}