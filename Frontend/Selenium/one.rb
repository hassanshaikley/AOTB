require 'selenium-webdriver'

website = "localhost:5000"

driver = Selenium::WebDriver.for :chrome
driver.navigate.to website

element = driver.find_element(:name, 'q')
element.send_keys "Selenium Tutorials"
element.submit

driver.quit
