use std::io;
use std::io::BufRead;
use std::fs::File;

fn main() {
    let filename = "actual.txt";

    let (mut list1, mut list2) = get_lists(filename).unwrap();

    list1.sort();
    list2.sort();

    let mut total_sum = 0;
    
    for i in 0..list1.len() {
        let difference;
        
        if list1[i] > list2[i] {
            difference = list1[i] - list2[i];
        } else {
            difference = list2[i] - list1[i];
        }
        
        total_sum += difference;
    }
    
    println!("Total difference: {}", total_sum);
    
    let mut similarity_score = 0;

    for i in 0..list1.len() {
        let mut j = 0;
        let mut num_count_in_list2 = 0;
        let mut num_is_present = false;

        while j < list2.len() {
            if list1[i] == list2[j] {
                num_count_in_list2 += 1;
                num_is_present = true;
            } else {
                if num_is_present {
                    break;
                }
            }
            j += 1;
        }

        similarity_score += list1[i] * num_count_in_list2;
    }

    println!("Similarity score: {}", similarity_score);

}

fn get_lists(filename: &str) -> io::Result<(Vec<u32>, Vec<u32>)> {
    let file = File::open(filename)?;
    let reader = io::BufReader::new(file);
    let mut list1 = vec![];
    let mut list2 = vec![];

    for line in reader.lines() {
        let line = line?;
        let nums: Vec<&str> = line.split_whitespace().collect();

        let num1 = nums[0].parse().unwrap();
        let num2 = nums[1].parse().unwrap();

        list1.push(num1);
        list2.push(num2);

    }

    Ok((list1, list2))
}