import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import CalculatorController from "./calculator.controller";


@Module({
	imports: [
		ClientsModule.register([
			{
				name: "CALCULATOR_PACKAGE",
				transport: Transport.GRPC,
				options: {
					package: "Calculator",
					protoPath: join(__dirname, "../calculator.proto"),
					url: "localhost:5000"
				}
			}
		])
	],
	controllers: [CalculatorController]
})
export default class CalculatorModule {}