from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Load the Excel data into a DataFrame
df = pd.read_excel("data/BattedBallData.xlsx")

@app.route('/api/homeruns', methods=['GET'])
def get_homeruns():
    # Filter rows where the play outcome is a homerun
    homeruns_df = df[df['PLAY_OUTCOME'] == 'HomeRun']
    
    # Group by 'BATTER' and count their homeruns
    aggregated_data = homeruns_df.groupby('BATTER').size().reset_index(name='homeruns')
    
    # Sort batters by homeruns and take top 10
    top_batters = aggregated_data.sort_values(by='homeruns', ascending=False).head(10)
    
    # Convert the sorted dataframe to a list of dictionaries
    result = top_batters.to_dict(orient="records")
    return jsonify(result)

@app.route('/api/batters', methods=['GET'])

if __name__ == '__main__':
    app.run(debug=True)
