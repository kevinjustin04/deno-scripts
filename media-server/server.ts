import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { send } from "@oak/oak/send";

const app = new Application();
const router = new Router();

router.get("/:file*", async (context) => {
	const { file } = context.params;

	try {
		await send(context, file, {
			root: "/mnt/onetb/MEDIA/",
		});
	} catch (error) {
		context.response.status = 404;
		context.response.body = { message: "File not found" };
	}
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log(`Server is running`);
