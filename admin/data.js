const categoriesList = document.getElementById("categories-list");

async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query GetAllCategories {
                        getAllCategories {
                            id
                            categoryPicture
                            language {
                                type
                                value
                            }
                        }
                    }
                `,
            }),
        });

        const { data } = await response.json();

        // Check if the data contains categories
        if (data && data.getAllCategories) {
            // Display categories on the admin content section
            const categories = data.getAllCategories;
            categoriesList.innerHTML = categories.map(category => `
                <ol>
                    <li>
                        <p>ID: ${category.id}</p>
                        <p>Category Picture: ${category.categoryPicture}</p>
                        <p>Language:</p>
                        <ul>
                            ${category.language.map(lang => `
                                <li>${lang.type}: ${lang.value}</li>
                            `).join('')}
                        </ul>
                    </li>
                </ol>
            `).join('');
        } else {
            categoriesList.innerHTML = "<p>No categories found.</p>";
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// Call the fetchCategories function to load the categories when the admin panel is displayed
fetchCategories();