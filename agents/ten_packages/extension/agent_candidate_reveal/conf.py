from .realtime.struct import Voices

DEFAULT_MODEL = "gpt-4o-realtime-preview"

DEFAULT_GREETING = "Great to see you again, here comes your matching..."

BASIC_PROMPT = """This is a purly matching bot providing you with the best companies"""


class RealtimeApiConfig:
    def __init__(
        self,
        base_uri: str = "wss://api.openai.com",
        api_key: str | None = None,
        path: str = "/v1/realtime",
        verbose: bool = False,
        model: str = DEFAULT_MODEL,
        language: str = "en-US",
        instruction: str = BASIC_PROMPT,
        temperature: float = 0.6,  # modified from 0.5
        max_tokens: int = 1024,
        voice: Voices = Voices.Shimmer,
        server_vad: bool = True,
        audio_out: bool = True,
        input_transcript: bool = True,
    ):
        self.base_uri = base_uri
        self.api_key = api_key
        self.path = path
        self.verbose = verbose
        self.model = model
        self.language = language
        self.instruction = instruction
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.voice = voice
        self.server_vad = server_vad
        self.audio_out = audio_out
        self.input_transcript = input_transcript

    def build_ctx(self) -> dict:
        return {
            "language": self.language,
            "model": self.model,
        }
