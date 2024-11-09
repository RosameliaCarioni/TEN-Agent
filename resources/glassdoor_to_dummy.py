import pandas as pd
import numpy as np

companies = ['Nordic Tech Solutions', 'Scandi Finance Group', 'Scandinavian Consulting Group']
locations = ['Helsinki, Finland', 'Oslo, Norway', 'Stockholm, Sweden']

data = pd.read_csv('./glassdoor_reviews.csv')
data = data.dropna()
sampled_df = data.sample(n=150, random_state=1)  
sampled_df = sampled_df.reset_index(drop=True)

indices_per_company = np.array_split(sampled_df.index, 3)
for i in range(len(companies)):
    sampled_df.iloc[indices_per_company[i], 0] = companies[i]
    sampled_df.iloc[indices_per_company[i], 3] = locations[i]

for i in range(sampled_df.shape[0]):
    sampled_df.iloc[i, 1] = f'2023-{np.random.randint(1, 13):02}-{np.random.randint(1, 30):02}'

sampled_df.to_json('glassdoor_reviews.json', orient='records', indent=2)