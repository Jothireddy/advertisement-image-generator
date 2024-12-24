import random
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
import torch
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware 


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.mount("/static", StaticFiles(directory=".", html=True), name="static")


pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")
pipe = pipe.to("cpu")


class ImageRequest(BaseModel):
    product: str
    tagline: str
    target_audience: str
    brand_palette: str


def generate_prompt(data: ImageRequest) -> str:
    return (
        f"A creative advertisement for the product '{data.product}', "
        f"with the tagline '{data.tagline}', targeting {data.target_audience}. "
        f"Include brand colors: {data.brand_palette}."
    )


def generate_score() -> float:
    
    return round(random.uniform(0, 10), 2)


@app.post("/generate-image/")
async def generate_image(request: ImageRequest):
    try:
      
        prompt = generate_prompt(request)
        image = pipe(prompt).images[0]
        image_path = "output.png"
        image.save(image_path)
        score = generate_score()
        return {"image_url": f"http://127.0.0.1:8000/static/{image_path}", "score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))