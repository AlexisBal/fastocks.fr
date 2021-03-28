def FindNameWebsite(url):
    list_url = url.split(".")
    index_www = list_url.index("https://www")
    website = list_url[index_www+1]
    return website

def WebsiteValidation(url):
    website = FindNameWebsite(url)
    list_valid_names = ["zalando", "hollisterco"]
    if website in list_valid_names:
        return website
    else:
        return None