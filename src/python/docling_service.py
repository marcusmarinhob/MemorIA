from flask import Flask, request, jsonify
from docling.document_converter import DocumentConverter
import tempfile
import os

app = Flask(__name__)

@app.route("/analisar", methods=["Post"])
def analisar_pdf():
    if "file" not in request.files:
        return jsonify({"error": "Nenhum arquivo enviado"}), 400

    file = request.files["file"]

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix= ".pdf") as tmp:
            file.save(tmp.name)
            tmp_path = tmp.name
        
        converter = DocumentConverter()
        result = converter.convert(tmp_path)
        markdown = result.document.export_to_markdown()

        os.remove(tmp_path)

        return jsonify({"markdown": markdown})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(port=5001, debug=True)