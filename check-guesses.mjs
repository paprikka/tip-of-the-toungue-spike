import { kv } from "@vercel/kv";

const run = async () => {
  const [_, keys] = await kv.scan(0, {
    match: "description:*",
  });

  const events = await kv.mget(...keys);

  const formattedEvents = events
    .filter((event) => event?.request && event?.response)
    .map(({ request, response }) =>
      `
    
Q: 
${request.description}

A: 
 - ${(response.guesses.map((_) => _.label) || []).join("\n - ")}

    `.trim()
    );

  console.log(formattedEvents.join("\n\n"));
};
run();
