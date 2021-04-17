import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Swagger
  const config = new DocumentBuilder()
    .setTitle("QC Docks")
    .setDescription("QC REST API documentation")
    .setVersion("1.0")
    .addTag("ducks")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("help", app, document);

  await app.listen(process.env.PORT || 80);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
