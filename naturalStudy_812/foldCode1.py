import numpy as np
import pandas as pd
import copy
import os
import sklearn
# from scipy.stats import pearsonr
# from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import RobustScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
# from sklearn.metrics import confusion_matrix
import featuretools as ft

# from sklearn.ensemble import RandomForestRegressor
import utils_original as utils
from numpy import mean

import os


# def run(dates, labels, auto_human_20feature_matrix):
#     pipeline_preprocessing = [("imputer",
#                                    SimpleImputer()),
#                                   ("scaler", RobustScaler(with_centering=True))] # StandardScaler
#     splitter = utils.TimeSeriesSplitByDate(dates=dates, earliest_date=pd.Timestamp('1/1/2008')) # predict 2004 2008 2012
#     all_X = auto_human_20feature_matrix.values
#     rf_regressor = RandomForestRegressor(
#             n_estimators=200,
#             random_state=50
#         )
#     pipeline_reg = Pipeline(pipeline_preprocessing + [('rf_reg', rf_regressor)])
#     # regression_score, a, b = utils.fit_and_score(np.array(X), labels, splitter, pipeline_reg)
#     regression_score, a, b = utils.fit_and_score(all_X, labels, splitter, pipeline_reg)
#     print(regression_score, mean(regression_score))
    
#     return regression_score



def loadData(es, DATA_DIR):

    label_country_Olympics = os.path.join(DATA_DIR, "num_medals_by_country_labels2016.csv")
    label_df1 = pd.read_csv(label_country_Olympics,
                           parse_dates=['Olympics Date'],
                           usecols=['Number of Medals', 'Olympics Date', 'Country', 'Olympic Games ID'],
                           encoding='utf-8')

    label_country = os.path.join(DATA_DIR, "cleaned_new_dictionary.csv")
    label_df2 = pd.read_csv(label_country,                       
                            encoding='utf-8')

    label_summer = os.path.join(DATA_DIR, "summer2016.csv")
    label_df3 = pd.read_csv(label_summer,                       
                            usecols=['Year', 'City', 'Sport', 'Athlete', 'Country', 'Gender', 'Medal', 'Age', 'Height', 'Weight'],
                            encoding='gbk')

    # label_df1 # label_df2 # label_df3
    # label_df.sort_values(['Olympics Date', 'Country'], inplace=True)
    cutoff_times = label_df1[['Country', 'Olympics Date']].rename(columns={'Country': 'Code', 'Olympics Date': 'time'})
    dates = label_df1['Olympics Date']
    labels = label_df1['Number of Medals']
    
    
    return label_df1, label_df2, label_df3, cutoff_times, dates, labels



def auto_human_features():
    auto_feature_matrix_encoded = auto_10features()
    auto_feature_matrix_encoded.drop(auto_feature_matrix_encoded.columns[[0]], axis = 1, inplace = True)
    human_10feature_names, human_10features = human_10eatures()
    
    auto_human_20feature_matrix = copy.deepcopy(auto_feature_matrix_encoded)
    for i in range(len(human_10feature_names)):
        auto_human_20feature_matrix.insert(auto_human_20feature_matrix.shape[1], human_10feature_names[i], human_10features[i])
        
    return auto_human_20feature_matrix

def autoFeatures(es, cutoff_times):
    agg_primitives = ['Sum', 'Max', 'Min', 'Mean', 
                  'Count', 'Num_Unique', 
                  'Mode', 'Trend', 'Skew'] 
    trans_primitives = ['Absolute', 'Percentile']

    feature_matrix, features = ft.dfs(
        entityset = es,
        target_entity = "countries",        # parameter 1
        trans_primitives = trans_primitives,
        agg_primitives = agg_primitives,    # parameter 2
        max_depth = 2,                      # parameter 3
        cutoff_time = cutoff_times,         # parameter 4
        verbose = True
    )

    print("{} features generated automatically".format(len(features)))
    feature_matrix_encoded, features_encoded = ft.encode_features(feature_matrix, features)
    
    return feature_matrix_encoded, features_encoded


def human_features():
    label_df = pd.read_csv("features/human/human_feature_past_medal_avg_num.csv",
                       encoding='utf-8')
    mean_medal_num = []
    for f in label_df.past_medal_avg_num:
        mean_medal_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_athlete_num.csv",
                           encoding='utf-8')
    athlete_num = []
    for f in label_df.athlete_num:
        athlete_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_women_athlete_num.csv",
                           encoding='utf-8')
    women_athlete_num = []
    for f in label_df.women_athlete_num:
        women_athlete_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_men_athlete_num.csv",
                           encoding='utf-8')
    men_athlete_num = []
    for f in label_df.men_athlete_num:
        men_athlete_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_historic_gold_modal_num.csv",
                           encoding='utf-8')
    historic_gold_modal_num = []
    for f in label_df.historic_gold_modal_num:
        historic_gold_modal_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_historic_silver_modal_num.csv",
                           encoding='utf-8')
    historic_silver_modal_num = []
    for f in label_df.historic_silver_modal_num:
        historic_silver_modal_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_historic_bronze_modal_num.csv",
                           encoding='utf-8')
    historic_bronze_modal_num = []
    for f in label_df.historic_bronze_modal_num:
        historic_bronze_modal_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_historic_Aquatics_modal_num.csv",
                           encoding='utf-8')
    historic_Aquatics_modal_num = []
    for f in label_df.historic_Aquatics_modal_num:
        historic_Aquatics_modal_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_historic_Athletics_modal_num.csv",
                           encoding='utf-8')
    historic_Athletics_modal_num = []
    for f in label_df.historic_Athletics_modal_num:
        historic_Athletics_modal_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_historic_Gymnastics_modal_num.csv",
                           encoding='utf-8')
    historic_Gymnastics_modal_num = []
    for f in label_df.historic_Gymnastics_modal_num:
        historic_Gymnastics_modal_num.append(f)

    label_df = pd.read_csv("features/human/human_feature_man_woman_ratio.csv",
                           encoding='utf-8')
    man_woman_ratio = []
    for f in label_df.man_woman_ratio_total:
        man_woman_ratio.append(f)

    label_df = pd.read_csv("features/human/human_feature_man_ratio.csv",
                           encoding='utf-8')
    man_ratio = []
    for f in label_df.man_ratio_total:
        man_ratio.append(f)

    label_df = pd.read_csv("features/human/human_feature_woman_ratio.csv",
                           encoding='utf-8')
    woman_ratio = []
    for f in label_df.woman_ratio_total:
        woman_ratio.append(f)

    label_df = pd.read_csv("features/human/human_feature_athlete_age_min.csv",
                           encoding='utf-8')
    athlete_age_min = []
    for f in label_df.athlete_age_min:
        athlete_age_min.append(f)

    label_df = pd.read_csv("features/human/human_feature_athlete_age_max.csv",
                           encoding='utf-8')
    athlete_age_max = []
    for f in label_df.athlete_age_max:
        athlete_age_max.append(f)


    label_df = pd.read_csv("features/human/human_feature_athlete_age_mean.csv",
                           encoding='utf-8')
    athlete_age_mean = []
    for f in label_df.athlete_age_mean:
        athlete_age_mean.append(f)

    # ,
    all_human_feature_names =['human_<MEAN(COUNT(medals_won.Medal))>','human_<SUM(medaling_athletes.NUM_UNIQUE(athletes.Athelete))>','human_<COUNT(medaling_athletes WHERE athlete.Gender = Women)>',  'human_<COUNT(medaling_athletes WHERE athlete.Gender = Men)>', 'human_<COUNT(countries_at_plympicgames WHERE medals_won.Medal = Gold)>',  'human_<COUNT(countries_at_plympicgames WHERE medals_won.Medal = Silver)>', 'human_<COUNT(countries_at_plympicgames WHERE medals_won.Medal = Bronze)>', 'human_<COUNT(medals_won.Medal WHERE sports.Sport = Aquatics)>', 'human_<COUNT(medals_won.Medal WHERE sports.Sport = Athletics)>', 'human_<COUNT(medals_won.Medal WHERE sports.Sport = Gymnastics)>', 'human_<RATIO(COUNT(athletes WHERE Gender = Men), COUNT(athletes WHERE Gender = Women))>', 'human_<RATIO(COUNT(athletes WHERE Gender = Men), COUNT(athletes.Athelete))>', 'human_<RATIO(COUNT(athletes WHERE Gender = Women), COUNT(athletes.Athelete))>','human_<MIN(atheletes.Age)>', 'human_<MAX(atheletes.Age)>', 'human_<MEAN(atheletes.Age)>']
    
    all_human_features = [mean_medal_num, athlete_num, women_athlete_num, men_athlete_num, historic_gold_modal_num, historic_silver_modal_num, 
                          historic_bronze_modal_num, historic_Aquatics_modal_num, historic_Athletics_modal_num, historic_Gymnastics_modal_num, man_woman_ratio, man_ratio, woman_ratio, athlete_age_min, athlete_age_max, athlete_age_mean]
     
    select_human_feature_names =['COUNT(medals_won.Medal WHERE sports.Sport = Gymnastics)', 
                                 'MIN(atheletes.Age)', 'MAX(atheletes.Age)', 'MEAN(atheletes.Age)', 
                                 'COUNT(medaling_athletes WHERE athlete.Gender = Women)', 
                                 'RATIO(COUNT(athletes WHERE Gender = Men), COUNT(athletes WHERE Gender = Women))', 
                                 'RATIO(COUNT(athletes WHERE Gender = Women), COUNT(athletes.Athelete))',
                                'SUM(medaling_athletes.NUM_UNIQUE(athletes.Athelete))',
                                'COUNT(medaling_athletes WHERE athlete.Gender = Men)'
                                ]
    
    select_human_features = [historic_Gymnastics_modal_num, 
                             athlete_age_min, athlete_age_max, athlete_age_mean, 
                             women_athlete_num, man_woman_ratio, woman_ratio, 
                             athlete_num, men_athlete_num]
    
    return select_human_feature_names, select_human_features


