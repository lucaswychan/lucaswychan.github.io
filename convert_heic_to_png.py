from PIL import Image
import sys
from pillow_heif import register_heif_opener
import os
from argparse import ArgumentParser

# Register the HEIF opener so Pillow can seamlessly read .HEIC files
register_heif_opener()

def convert_heic_to_png(input_path, output_path, delete=False):
    """
    Converts a HEIC image file to a PNG format.
    """
    if not os.path.exists(input_path):
        print(f"Error: The file '{input_path}' does not exist.")
        return

    try:
        # Open the HEIC image
        print(f"Opening {input_path}...")
        image = Image.open(input_path)
        
        # Save the image as a PNG
        image.save(output_path, format="PNG")
        print(f"Success! Image saved to '{output_path}'")
        if delete:
            if os.path.exists(input_path):
                os.remove(input_path)
                print(f"Original file '{input_path}' deleted.")
            else:
                print(f"Original file '{input_path}' does not exist.")
    except Exception as e:
        print(f"An error occurred during conversion: {e}")

# Example usage
if __name__ == "__main__":
    # Replace these strings with your actual file paths
    parser = ArgumentParser()
    parser.add_argument("input_file", type=str, help="The input HEIC file to convert")
    parser.add_argument("--delete", action="store_true",default=False, help="Delete the original HEIC file after conversion")

    args = parser.parse_args()
    convert_heic_to_png(args.input_file, args.input_file.replace(".HEIC", ".png"), args.delete)
