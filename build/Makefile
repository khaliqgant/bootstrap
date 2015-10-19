# set main file name
MAIN =

# set implicit flags
CC      = gcc
CFLAGS  = -g -Wall
INCLUDES = ../part1
LDLIBS = -lmylibename
LDFLAGS = -L$(INCLUDES) -I$(INCLUDES)

INPUTS = test test test

$(MAIN): $(MAIN).o

.PHONY: clean
clean :
		rm -f *.o $(MAIN)

.PHONY: all
all : clean $(MAIN)

.PHONY: valgrind
valgrind: $(MAIN)
		valgrind --leak-check=full ./$(MAIN) $(INPUTS)

.PHONY: run
run:
	./$(MAIN) $(INUTS)
