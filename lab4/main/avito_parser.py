from bs4 import BeautifulSoup
import requests
import json
import re


def get_html(url):
    return requests.get(url).text


def get_page_data(html, max_products=5):
    soup = BeautifulSoup(html, 'lxml')
    ads = soup.find('div', class_='catalog-list').find_all('div', class_='item_table')
    l_data = []
    for ad in ads:
        if len(l_data) >= max_products:
            return l_data

        title = ''
        url = ''
        price = ''
        category, company, metro = '', '', ''
        image_url = ''
        try:
            image_url = ad.find('div', class_='item-slider-image large-picture')["style"][22:-1]
        except:
            """
            image_url = ad.find('img', class_='large-picture photo-count-show')["src"]
            image_url = ad.find('div', class_="item-photo item-photo_large").find("a", class_="photo-wrapper js-photo-wrapper large-picture")
            """
            image_url = ''

        try:
            title = ad.find('div', class_='description').find('h3').text.strip()
        except:
            pass
        try:
            url = 'https://www.avito.ru' + ad.find('div', class_='description').find('h3').find('a').get('href')
        except:
            pass
        try:
            price = ad.find('div', class_='description').find('div', class_='about').text.strip().split("₽")[0].strip()
        except:
            pass
        try:
            p_list = ad.find('div', class_='data').find_all('p')

            if len(p_list) == 2:
                category = p_list[0].text.split("|")[0].strip()
                company = p_list[0].text.split("|")[1].strip()
                metro = re.sub(r'\xa0', ' ', p_list[1].text.strip())
            if len(p_list) == 1:
                category = p_list[0].text.split("|")[0].strip()
                company = p_list[0].text.split("|")[1].strip()
        except:
            pass

        data = {'title': title, 'url': url, 'image_url': image_url, 'price': price,
                'category': category, 'company': company, 'metro': metro}
        l_data.append(data)
    return l_data


def detail_product_data(html):
    soup = BeautifulSoup(html, 'lxml')
    if soup.find('div', 'b-404'):
        return None

    item = soup.find('div', class_='item-view')

    title, price, image_url = '', '', ''

    try:
        image_url = item.find('div', class_="gallery-img-frame js-gallery-img-frame").find('img')["src"]
    except:
        pass
    try:
        title = item.find('h1', class_='title-info-title').text.strip()
    except:
        pass
    try:
        price = item.find('span', class_='js-item-price').text
    except:
        pass

    return {'title': title,
            'price': price,
            'image_url': image_url,
            }


def main():
    # url = 'https://www.avito.ru/moskva?s_trg=1&q=samsung'
    # print(get_page_data(get_html(url)))
    url = "https://www.avito.ru/moskva/gruzoviki_i_spetstehnika/analog_buldozera_cat_d7_-_shehwa_sd7_2012_g_1129397251"
    print(detail_product_data(get_html(url)))


if __name__ == '__main__':
    main()
