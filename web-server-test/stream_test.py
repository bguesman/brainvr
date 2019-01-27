import pandas
import numpy as np
import scipy
from scipy import signal
from matplotlib import pyplot as plt

r = np.zeros([1, 4])

def bandpower(x, fs, fmin, fmax):
	f, Pxx = scipy.signal.periodogram(x, fs=fs)
	ind_min = scipy.argmax(f > fmin) - 1
	ind_max = scipy.argmax(f > fmax) - 1
	return scipy.trapz(Pxx[ind_min: ind_max], f[ind_min: ind_max])

# def get_bands():
# 	global r
# 	# return r[r.shape[0] - 1]
# 	return r.shape[0]

# def band():
# 	#f = open("data_try.txt","r")
# 	#print(f.read())
# 	while True:
# 		data = pandas.read_csv('‎⁨Macintosh HD⁩/Users⁩/dc⁩/Desktop⁩/SavedData/OpenBCI-RAW-EEG_test.txt', header = 6)
# 		d = data.values
# 		ch = np.array(d[-100:,1:9], dtype=np.float32)

# 		it = 0
# 		Ca = 0
# 		Ct = 0
# 		Cd = 0
# 		Cb = 0

# 		for i in range(8):
# 			if (np.std(ch[:,i])) > 0:
# 				it = it + 1
# 				Cd = Cd + bandpower(ch[:,i], 250, 0.1, 4)
# 				Ct = Ct + bandpower(ch[:,i], 250, 4, 8)
# 				Ca = Ca + bandpower(ch[:,i], 250, 8, 15)
# 				Cb = Cb + bandpower(ch[:,i], 250, 15, 30)

# 		if it > 0:
# 			Ca = Ca/it
# 			Ct = Ct/it
# 			Cd = Ca/it
# 			Cb = Cb/it
# 		else:
# 			Ca = 0
# 			Ct = 0
# 			Cd = 0
# 			Cb = 0

# 		#r = np.array([Ca, Ct, Cd, Cb])
# 		global r
# 		r = np.vstack((r, [Ca, Ct, Cd, Cb]))








		#cp1 = bandpower(np.abs(ch1), 250, 8, 13)



# if __name__ == '__main__':
# 	#while True:
# 	band()
# 		#f = open("data_try.txt","r")
# 		#f= open("ugh.txt","w+")
# 		#print(f.read())#('fldsd')
