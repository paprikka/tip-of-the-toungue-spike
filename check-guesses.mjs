import { kv } from "@vercel/kv";

const run = async () => {
  const [_, keys] = await kv.scan(0, {
    match: "description:*",
    count: 1000,
  });

  console.log(`Found ${keys.length} keys`);

  const events = await kv.mget(...keys);

  console.log(`Found ${events.length} events`);
  console.log({ events });

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
