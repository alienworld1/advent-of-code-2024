package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func check_direction(lines []string, row, col, dx, dy int, word string) bool {
	for i := 0; i < len(word); i++ {
		if row < 0 || row >= len(lines) || col < 0 || col >= len(lines[0]) {
			return false
		}
		if lines[row][col] != word[i] {
			return false
		}
		row += dx
		col += dy
	}
	return true
}

func main() {
	file, err := os.Open("actual.txt")
	var lines []string

	word := "XMAS"

	directions := [][]int{
		// horizontal
		{0, 1}, {0, -1},
		// vertical
		{1, 0}, {-1, 0},
		// diagonals
		{1, 1}, {1, -1}, {-1, 1}, {-1, -1},
	}

	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	number_of_rows := len(lines)
	line_length := len(lines[0])
	num_matches := 0

	for i := 0; i < number_of_rows; i++ {
		for j := 0; j < line_length; j++ {
			for _, value := range directions {
				if check_direction(lines, i, j, value[0], value[1], word) {
					num_matches++
				}
			}
		}
	}

	fmt.Printf("Number of matches: %d\n", num_matches)

}
