import os

DEFAULT_FOLDER_DESCRIPTION = "Manage your own flows. Download and upload projects."
# Use DEFAULT_FOLDER_NAME env var, defaulting to "Project" if not set
DEFAULT_FOLDER_NAME = os.getenv("DEFAULT_FOLDER_NAME", "Project")

# Legacy folder names that may exist from previous installations
LEGACY_FOLDER_NAMES = ["My Collection", "Starter Project"]
