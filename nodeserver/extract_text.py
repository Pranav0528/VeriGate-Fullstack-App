import sys
import fitz  # pip install PyMuPDF

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ''
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text += page.get_text()
    doc.close()
    return text

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python pdf_reader.py <pdf_path>")
        sys.exit(1)

    pdf_path = sys.argv[1].strip('"')

    try:
        pdf_text = extract_text_from_pdf(pdf_path)
        print(pdf_text)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
