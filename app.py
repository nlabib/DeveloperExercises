from flask import Flask, jsonify
import pandas as pd
import plotly.express as px
import plotly.io as pio


app = Flask(__name__)

# Load the Excel data into a DataFrame
df = pd.read_excel("data/BattedBallData.xlsx")

#Batter LeaderBoard
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

@app.route('/api/exitspeed', methods=['GET'])
def get_exit_speed():
    # Sort by exit speed and get top 10
    top_exit_speed = df.nlargest(10, 'EXIT_SPEED')
    # Convert to JSON and return
    
    return top_exit_speed.to_json(orient='records')

@app.route('/api/hitdistance', methods=['GET'])
def get_hit_distance():
    # Sort by hit distance and get top 10
    top_hit_distance = df.nlargest(10, 'HIT_DISTANCE')
    # Convert to JSON and return
    return top_hit_distance.to_json(orient='records')

@app.route('/api/sweetspots', methods=['GET'])
def get_sweetspots():
    sweetspots_df = df[(df['LAUNCH_ANGLE'] >= 25) & (df['LAUNCH_ANGLE'] <= 35)]
    # Group by 'BATTER' and count their sweet spot hits
    aggregated_data = sweetspots_df.groupby('BATTER').size().reset_index(name='sweetspots')
    # Sort batters by sweet spot hits and take top 10
    top_batters = aggregated_data.sort_values(by='sweetspots', ascending=False).head(10)
    # Convert the sorted dataframe to a list of dictionaries
    result = top_batters.to_dict(orient="records")
    return jsonify(result)

#Pitcher LeaderBoard
@app.route('/api/toppitchers', methods=['GET'])
def get_top_pitchers():
    # Group by 'PITCHER' and calculate the average EXIT_VELO against each pitcher
    aggregated_data = df.groupby('PITCHER').EXIT_SPEED.mean().reset_index()
    
    # Sort pitchers by average EXIT_VELO in ascending order
    aggregated_data = aggregated_data.sort_values(by='EXIT_SPEED', ascending=True)
    
    # Assign rank from 1 to the number of pitchers
    aggregated_data['RANK'] = range(1, len(aggregated_data) + 1)
    
    # Take the top 10 pitchers
    aggregated_data = aggregated_data.head(10)

    # Sort the dataframe by rank
    aggregated_data = aggregated_data.sort_values(by='RANK')

    # Convert the sorted dataframe to a list of dictionaries
    result = aggregated_data.to_dict(orient="records")
    return jsonify(result)
 
@app.route('/api/topspinrate', methods=['GET'])
def get_top_spin_rate():
    # Group by 'PITCHER' and calculate the average SPIN_RATE for each pitcher
    aggregated_data = df.groupby('PITCHER').HIT_SPIN_RATE.mean().reset_index()  # Adjust the column name if different
    
    # Sort pitchers by average SPIN_RATE in descending order
    aggregated_data = aggregated_data.sort_values(by='HIT_SPIN_RATE', ascending=False)
    
    # Assign rank from 1 to the number of pitchers
    aggregated_data['RANK'] = range(1, len(aggregated_data) + 1)
    
    # Filter to keep only the top 10 ranked pitchers
    top_pitchers = aggregated_data.head(10)  # This line ensures only the top 10 are selected
    
    # Convert the dataframe to a list of dictionaries
    result = top_pitchers.to_dict(orient="records")
    return jsonify(result)


@app.route('/api/strikeouts', methods=['GET'])
def get_strikeouts():
    # Filter rows where the play outcome is a strikeout
    strikeouts_df = df[df['PLAY_OUTCOME'] == 'Out']  # Adjust the string if needed
    
    # Group by 'PITCHER' and count their strikeouts
    aggregated_data = strikeouts_df.groupby('PITCHER').size().reset_index(name='strikeouts')
    
    # Sort pitchers by strikeouts in descending order
    sorted_pitchers = aggregated_data.sort_values(by='strikeouts', ascending=False)
        
    # Assign rank from 1 to the number of pitchers
    sorted_pitchers['RANK'] = range(1, len(aggregated_data) + 1)


    top_pitchers = sorted_pitchers.head(10)  # This line ensures only the top 10 are selected

    # Convert the sorted dataframe to a list of dictionaries
    result = top_pitchers.to_dict(orient="records")
    return jsonify(result) 

@app.route('/api/scatterdata', methods=['GET'])
def scatter_data():
    data = df[['LAUNCH_ANGLE', 'EXIT_SPEED', 'BATTER']].to_dict(orient="records")
    return jsonify(data)


@app.route('/api/heatmapdata', methods=['GET'])
def heatmap_data():
    data = df[['EXIT_DIRECTION', 'HIT_DISTANCE']].to_dict(orient="records")
    
    # Calculate min and max values for both axes
    bounds = {
        'min_exit_direction': df['EXIT_DIRECTION'].min(),
        'max_exit_direction': df['EXIT_DIRECTION'].max(),
        'min_hit_distance': df['HIT_DISTANCE'].min(),
        'max_hit_distance': df['HIT_DISTANCE'].max(),
    }
    return jsonify({'data': data, 'bounds': bounds})

@app.route('/api/playoutcome', methods=['GET'])
def play_outcome_data():
    # Group by 'PLAY_OUTCOME', 'LAUNCH_ANGLE', 'EXIT_VELO', and 'EXIT_DIRECTION'
    # and get their counts
    grouped_data = df.groupby(['PLAY_OUTCOME', 'LAUNCH_ANGLE', 'EXIT_SPEED', 'EXIT_DIRECTION']).size().reset_index(name='counts')
    return grouped_data.to_json(orient="records")
if __name__ == '__main__':
    app.run(debug=True)
