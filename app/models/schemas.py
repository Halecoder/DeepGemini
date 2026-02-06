from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Union, List
import json
from datetime import datetime


class ModelBase(BaseModel):
    name: str
    type: str
    provider: str
    api_key: str
    api_url: str
    model_name: str
    max_tokens: int = 2000
    temperature: float = 0.7
    top_p: float = 1.0
    presence_penalty: float = 0.0
    frequency_penalty: float = 0.0
    enable_tools: bool = False
    tools: Optional[List[Dict]] = None
    tool_choice: Optional[Dict] = None
    enable_thinking: bool = False
    thinking_budget_tokens: int = 16000
    custom_parameters: Optional[Dict[str, Union[str, int, float, bool]]] = Field(
        default_factory=dict
    )

    class Config:
        orm_mode = True


class ModelCreate(ModelBase):
    pass


class Model(ModelBase):
    id: int


class ConfigurationStepBase(BaseModel):
    model_id: int
    step_type: str  # "reasoning" or "execution"
    step_order: int
    system_prompt: str = ""


class ConfigurationStepCreate(ConfigurationStepBase):
    pass


class ConfigurationStep(ConfigurationStepBase):
    id: int
    configuration_id: int

    class Config:
        orm_mode = True


class ConfigurationBase(BaseModel):
    name: str
    is_active: bool = True
    transfer_content: Dict = {}


class ConfigurationCreate(ConfigurationBase):
    steps: List[ConfigurationStepCreate]


class ConversationHistoryBase(BaseModel):
    session_id: str
    title: str
    messages: List[Dict]


class ConversationHistoryCreate(ConversationHistoryBase):
    pass


class ConversationHistory(ConversationHistoryBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class Configuration(ConfigurationBase):
    id: int
    steps: List[ConfigurationStep]

    class Config:
        orm_mode = True
