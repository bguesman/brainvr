import pandas

def main():
	#f = open("data_try.txt","r") 
	#print(f.read())
	data = pandas.read_csv('EEG_test.txt', header = 6)
	d = data.values;
	ch1 = d[-100:,1]
	ch2 = d[-100:,2]
	ch3 = d[-100:,3]
	ch4 = d[-100:,4]
	ch5 = d[-100:,5]
	ch6 = d[-100:,6]
	ch7 = d[-100:,7]
	ch8 = d[-100:,8]
	print(ch1)

	
if __name__ == '__main__':
	while True:
		main()
		#f = open("data_try.txt","r") 
		#f= open("ugh.txt","w+")
		#print(f.read())#('fldsd')
		
