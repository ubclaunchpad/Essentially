from summarization import summarize

def get_summary(event, context):
    text, num_sentences = event["content"]["text"], event["length"] or 3

    if not text:
        return {
            "statusCode": 400,
            "message": "Empty Text!"
        }

    if type(text) is not str or type(num_sentences) is not int:
        return {
            "statusCode": 400,
            "message": "Bad Input Type!"
        }

    try:
        result = summarize(text)
        num_words = len(result.split(" "))
        return {
            "statusCode": 200,
            "summarized_text": result, 
            "Meta": {
                "length": num_words
            }
        }
    except:
        return {
            "statusCode": 500,
            "message": "Unknown Error!"
        }