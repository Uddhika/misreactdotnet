using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;


namespace AI_Chatbot.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class GPTController : ControllerBase
    {
        [HttpGet]
        [Route("UseChatGPT")]
        public async Task<IActionResult> UseChatGPT(string query)
        {
            string outputResult = "";
            var openai = new OpenAIAPI("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");
            CompletionRequest completionRequest = new CompletionRequest();
            completionRequest.Prompt = query;
            completionRequest.Model = OpenAI_API.Models.Model.DavinciText;

            var completions = openai.Completions.CreateCompletionsAsync(completionRequest);

            foreach(var completion in completions.Result.Completions)
            {
                outputResult += completion.Text;
            }

            return Ok(outputResult);
        }
    }
}
