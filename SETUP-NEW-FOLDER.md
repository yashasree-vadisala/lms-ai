# Setting up your new folder — full picture

You now have two separate things:
- **Your old project** — kept safe, untouched, has its own working backend.
- **Your new folder** — currently only has the split frontend. It has **no
  backend yet** — that's what this delivers.

I don't have access to either folder on your machine. Everything below is a
fresh copy of the exact `main.py` you uploaded (byte-for-byte, no edits) plus
two new files to make setup easier.

## What's in this zip

```
backend/
├── main.py          — your original backend, completely unchanged
├── requirements.txt — new: the packages main.py needs, for `pip install -r`
└── .env.example      — new: reference for what your .env needs
```

## Steps for your new folder

1. Create a `backend/` folder inside your new project (next to `frontend/`).
2. Copy `main.py` and `requirements.txt` into it.
3. Create a real `.env` file in that same `backend/` folder (copy
   `.env.example` and fill in your actual key):
   ```
   GEMINI_API_KEY=your-real-key-here
   GOOGLE_API_KEY=your-real-key-here
   ```
4. Install dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
5. Run it:
   ```
   python main.py
   ```
   or
   ```
   uvicorn main:app --reload
   ```
   It'll start on `http://0.0.0.0:8000`.
6. Your frontend's `.env` already points at `http://127.0.0.1:8000` by
   default (from the last step), so once both are running, the two will
   talk to each other.

Your new folder structure should end up looking like:
```
new-project/
├── frontend/
│   ├── .env
│   └── src/...
└── backend/
    ├── main.py
    ├── requirements.txt
    └── .env   (you create this, not committed to git)
```
