# VIDEO SERVICE

### Requirments
- NodeJS > v.16

### Run

    yarn install
    yarn dev


### Usage
Run this URL
    POST http://localhost:3100/video

with the following body:
    {
        "composition": {
            "type": "video",
            "path": "https://res.cloudinary.com/dix3v9vzg/video/upload/v1665668916/tutorials/ffmpeg-universal-api/main-video.mp4",
            "length": "00:00:10",
            "start": "00:00:05",
            "operations": [
                {
                    "type": "crop",
                    "width": 360,
                    "height": 640
                }
            ],
            "overlays": [
                {
                    "type": "text",
                    "text": "FFmpeg generic server",
                    "size": 22,
                    "x": "(w-tw)/2",
                    "y": "534",
                    "color": "#FFB000"
                },
                {
                    "type": "image",
                    "path": "https://res.cloudinary.com/dix3v9vzg/image/upload/v1666012114/tutorials/ffmpeg-universal-api/logo.png",
                    "operations": [
                        {
                            "type": "scale",
                            "width": 200,
                            "height": -1
                        }
                    ],
                    "x": 10,
                    "y": 10
                }
            ]
        }
    }

after you should see as a response:
    {
        "ok": true
    }
look at the root of project and you will see the output file after video transformations with the name `test.mp4`
