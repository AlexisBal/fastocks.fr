def FindNameWebsite(url):
    decomposition_url_1 = url.split("/")
    decomposition_url_2 = decomposition_url_1[2].split(".")
    index_www = decomposition_url_2.index("www")
    website = decomposition_url_2[index_www + 1]
    return [website, decomposition_url_1]


def DecompositeurUrlHollister(decomposition_1):
    # Nom brut du produit
    index_ref = decomposition_1.index("p") + 1
    decomposition_2 = decomposition_1[index_ref].split("?")
    product_name_brut = decomposition_2[0]
    # Nom du produit
    decomposition_2_bis = product_name_brut.split("-")
    taille_liste = len(decomposition_2_bis)
    product_name = ""
    if len(decomposition_2_bis[taille_liste - 1]) == 1:
        for x in range(0, taille_liste - 2):
            if x == taille_liste - 3:
                product_name += decomposition_2_bis[x]
            else:
                product_name += decomposition_2_bis[x] + "-"
    else:
        for x in range(0, taille_liste - 1):
            if x == taille_liste - 2:
                product_name += decomposition_2_bis[x]
            else:
                product_name += decomposition_2_bis[x] + "-"
    return product_name


def DecompositeurUrlZalando(decomposition_1):
    # Nom, marque et couleur du produit
    decomposition_2 = decomposition_1[3].split("-")
    taille_liste = len(decomposition_2)
    product_name = ""
    product_brand = decomposition_2[0]
    product_color = decomposition_2[taille_liste-3]
    for x in range(1, taille_liste-3):
        if x == taille_liste - 4:
            product_name += decomposition_2[x]
        else:
            product_name += decomposition_2[x] + "-"
    return [product_name, product_brand, product_color]


def WebsiteValidation(url):
    analyse = FindNameWebsite(url)
    website = analyse[0]
    decomposition_url = analyse[1]
    list_valid_names = {
        "zalando": {"market_place": "zalando", "categorie": None, "size": None},
        "fnac": {"market_place": "fnac", "brand": "", "categorie": "", "size": "", "color": ""},
        "hollisterco": {"market_place": "hollister", "brand": "hollister", "categorie": "", "size": "", "color": ""},
    }
    if website in list_valid_names:
        if website == "hollisterco":
            product_name = DecompositeurUrlHollister(decomposition_url)
            list_valid_names[website]["name"] = product_name

        if website == "fnac":
            product_name = decomposition_url[3]
            list_valid_names[website]["name"] = product_name

        if website == "zalando":
            analyse = DecompositeurUrlZalando(decomposition_url)
            product_name = analyse[0]
            product_brand = analyse[1]
            product_color = analyse[2]
            list_valid_names[website]["name"] = product_name
            list_valid_names[website]["brand"] = product_brand
            list_valid_names[website]["color"] = product_color
           
        return list_valid_names[website]

    else:
        return None


url_fnac = "https://www.fnac.com/Apple-iPad-Pro-12-9-128-Go-Gris-sideral-Wi-Fi-2020-4eme-generation/a14473842/w-4"
url_zalando = "https://www.zalando.cz/primitive-changes-tee-triko-spotiskem-black-pro22o03p-q11.html"
url_hollister = "https://www.hollisterco.com/shop/eu-fr/p/pantalon-chino-super-skinny-advanced-stretch-33207350?categoryId=6567627&seq=07&faceout=prod1"

