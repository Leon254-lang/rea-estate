#temperature conversion
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C is equal to {fahrenheit}°F")
temperature=float(input("Enter the current room temperature in Celsius: "))
fahrenheit = (temperature * 9/5) + 32
if temperature > 30:
    print(f"{temperature}°C is equal to {fahrenheit}°F. It's hot outside!") 
print(f"{temperature}°C is equal to {fahrenheit}°F")




#loops
#while loop
number=1
while number<=15:
    print(number)
    number+=1
#for loop
for x in range(10,30):
    print(x)
#functions/methods
#standard function
z=min(5,10,15)
print(z)
y=max(5,10,15)
print(y)
#user-defined function
def greet(name):
    print("Hello, " + name + "!")

def school(emobilis):
    print("Welcome to " + emobilis + " school!")
def classroom():
    print("west")
    classroom()

def multiply(a, b, c, d):
    a= int(input("Enter the first number: "))
    b=int(input("Enter the second number: "))
    c=int(input("Enter the third number: "))
    d=int(input("Enter the fourth number: "))
    return a * b * c * d    