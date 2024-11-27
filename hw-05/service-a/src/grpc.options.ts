import { ClientOptions, Transport } from "@nestjs/microservices";
import { join } from "path";


export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: "Calculator",
    protoPath: join(__dirname, './calculator.proto'),
  },
};