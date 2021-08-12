import pandas as pd
from sklearn.preprocessing import RobustScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

from sklearn.ensemble import RandomForestRegressor
import utils_original as utils
from numpy import mean

def reg_model(dates, labels, auto_human_20feature_matrix):
    pipeline_preprocessing = [("imputer",
                                   SimpleImputer()),
                                  ("scaler", RobustScaler(with_centering=True))] # StandardScaler
    splitter = utils.TimeSeriesSplitByDate(dates=dates, earliest_date=pd.Timestamp('1/1/2012')) # predict 2004 2008 2012
    all_X = auto_human_20feature_matrix.values
    rf_regressor = RandomForestRegressor(
            n_estimators=200,
            random_state=50
        )
    pipeline_reg = Pipeline(pipeline_preprocessing + [('rf_reg', rf_regressor)])
    # regression_score, a, b = utils.fit_and_score(np.array(X), labels, splitter, pipeline_reg)
    regression_score, a, b = utils.fit_and_score(all_X, labels, splitter, pipeline_reg)
    
    
    feature_imp = utils.get_feature_importances(pipeline_reg, 
                                            auto_human_20feature_matrix, 
                                            labels, splitter, 300)
    
    print(regression_score, mean(regression_score))
    
    return regression_score, feature_imp