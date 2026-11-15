INSERT INTO books (title, author, genre, publication_year, rating, price, cover, description) VALUES
('The Midnight Library', 'Matt Haig', 'Fiction', 2020, 4.2, 18.99, 'midnight', 'Between life and death there is a library, and within that library, the shelves go on forever. Every book offers a chance to try another life you could have lived.'),
('Tomorrow, and Tomorrow, and Tomorrow', 'Gabrielle Zevin', 'Fiction', 2022, 4.5, 19.50, 'tomorrow', 'A dazzling novel about friendship, creativity, and the worlds we build together, following two friends who create video games across decades.'),
('Project Hail Mary', 'Andy Weir', 'Science Fiction', 2021, 4.7, 21.00, 'hail', 'Ryland Grace wakes up alone, light-years from home, with no memory of who he is or how he got there. The answer may be the key to saving Earth.'),
('The Song of Achilles', 'Madeline Miller', 'Fantasy', 2011, 4.4, 17.25, 'achilles', 'A retelling of the Iliad through the life of Patroclus, from his first meeting with Achilles to the fateful Trojan War.'),
('Educated', 'Tara Westover', 'Memoir', 2018, 4.3, 16.75, 'educated', 'Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom.'),
('Atomic Habits', 'James Clear', 'Nonfiction', 2018, 4.6, 20.00, 'atomic', 'A practical guide to building good habits, breaking bad ones, and making small changes that compound into remarkable results.'),
('Piranesi', 'Susanna Clarke', 'Fantasy', 2020, 4.1, 15.99, 'piranesi', 'A dreamlike mystery set in a vast House of endless halls, statues, and tides, where one man tries to understand his world.'),
('The Vanishing Half', 'Brit Bennett', 'Fiction', 2020, 4.0, 18.50, 'vanishing', 'The lives of twin sisters diverge as one builds a new life far away, and the next generation finds their paths intertwining.')
ON CONFLICT DO NOTHING;
