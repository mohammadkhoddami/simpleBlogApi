#!/bin/bash

# --- Check for Project Name Argument ---
if [ -z "$1" ]; then
    echo "❌ Error: Project name is required."
    echo "Usage: ./setup.sh <project_name> OR ./setup.sh ."
    exit 1
fi

PROJECT_NAME=$1
CONFIG_NAME="config"

# --- Logic to handle "." (Current Directory) ---
if [ "$PROJECT_NAME" == "." ]; then
    echo "🚀 Setting up Django Project in CURRENT directory..."
    # No mkdir, No cd
else
    # Standard logic for new folder
    if [ -d "$PROJECT_NAME" ]; then
        echo "❌ Error: Directory '$PROJECT_NAME' already exists."
        exit 1
    fi
    echo "🚀 Starting Django Project: $PROJECT_NAME"
    mkdir "$PROJECT_NAME"
    cd "$PROJECT_NAME"
fi

# 1. Set up Virtual Environment
python3 -m venv venv
cd venv
cd Scripts
source activate

echo "📦 Installing Dependencies..."
pip install django djangorestframework django-cors-headers python-dotenv psycopg2

# 2. Start Django Project
# naming the folder 'config' instead of project name for cleaner imports
django-admin startproject "$CONFIG_NAME" .

# 3. Helper Function: Convert file to package
convert_to_package() {
    APP=$1
    COMPONENT=$2
    TARGET_DIR="$APP/$COMPONENT"
    
    if [ -f "$APP/$COMPONENT.py" ]; then
        rm "$APP/$COMPONENT.py"
    fi
    
    mkdir -p "$TARGET_DIR"
    touch "$TARGET_DIR/__init__.py"
}

# 4. Create Apps using startapp & Clean up
APPS=("api" "core")

for app in "${APPS[@]}"; do
    echo "⚙️  Creating app: $app"
    python manage.py startapp "$app"
    rm "$app/tests.py"
done

# ==========================================
# 5. Apply Custom Folder Structure
# ==========================================

# --- API App ---
mkdir -p api/endpoints
touch api/endpoints/__init__.py
convert_to_package "api" "views"

# --- CORE App ---
convert_to_package "core" "models"
mkdir -p core/models/base
touch core/models/base/__init__.py

convert_to_package "core" "serializer"
mkdir -p core/serializer/base
touch core/serializer/base/__init__.py

mkdir -p core/context
touch core/context/__init__.py

mkdir -p core/filters
touch core/filters/__init__.py

mkdir -p core/permissions
touch core/permissions/__init__.py

mkdir -p core/validators
touch core/validators/__init__.py

mkdir -p core/management/commands
touch core/management/__init__.py
touch core/management/commands/__init__.py

# --- CONFIG Folder ---
mkdir -p config/middleware
touch config/middleware/__init__.py

# --- Create Docker file ---
type nul > Dockerfile
type nul > docker-compose.yaml

# ==========================================
# 7. Final Configuration Files
# ==========================================
touch .env
curl -s https://www.toptal.com/developers/gitignore/api/django,python,linux,macos > .gitignore
pip freeze > requirements.txt

echo "--------------------------------------------------------"
if [ "$PROJECT_NAME" == "." ]; then
    echo "✅ Project created successfully in current directory!"
else
    echo "✅ Project '$PROJECT_NAME' created successfully!"
fi
echo "👉 Apps created via 'startapp' and cleaned up."
echo "👉 Structure matches your custom tree exactly."
echo "--------------------------------------------------------"