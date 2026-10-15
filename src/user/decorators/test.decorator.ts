import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Test = createParamDecorator((data, context: ExecutionContext)=>{
    const request = context.switchToHttp().getRequest()
    console.log("🚀 ~ :5 ~ request:", request)
})